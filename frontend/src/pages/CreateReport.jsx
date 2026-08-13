import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  Save,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Sparkles,
} from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import kleLogo from "../assets/kle-centenary-logo.jpg";
import { saveDocument } from "../utils/storage";
import "./Notice.css";

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

function CreateReport({ setCurrentPage, user }) {
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const [report, setReport] = useState({
    title: "Monthly Academic & Attendance Progress Report",
    date: getCurrentDate(),
    department: "Department of Computer Science (BCA)",
    preparedBy: user?.name || "Arpita Horatti",
    designation: "Assistant Professor",
    period: "August 2026",
    summary:
      "This report provides a comprehensive summary of academic coverage, practical lab assessments, student attendance statistics, and departmental events conducted during August 2026.",
    outcomes:
      "1. Completed 90% of syllabus modules for BCA II & IV Semester courses.\n2. Successfully conducted Matrix Workshop on Cloud Computing.\n3. Average overall attendance recorded at 88.5%.",
    coordinatorName: "Manoj Gantikarai",
    principalName: "Dr. S. V. Patil",
  });

  const [sections, setSections] = useState([
    {
      metric: "Total Classes Conducted",
      stat: "48 Sessions",
      status: "On Schedule",
    },
    {
      metric: "Average Student Attendance",
      stat: "88.5%",
      status: "Satisfactory",
    },
    {
      metric: "Practical Labs Completed",
      stat: "12 Experiments",
      status: "Completed",
    },
  ]);

  const handleChange = (field, value) => {
    setReport((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const addSectionRow = () => {
    setSections([
      ...sections,
      { metric: "Assignment Evaluation", stat: "100% Graded", status: "Completed" },
    ]);
  };

  const removeSectionRow = (index) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    saveDocument({
      title: report.title,
      type: "Report",
      status: "PENDING",
      submittedAt: "Just now",
      date: report.date,
      author: report.preparedBy,
      details: `Period: ${report.period} | Department: ${report.department}`,
    });
    showToast("Report saved successfully and queued for approval!", "success");
  };

  const downloadWord = async () => {
    try {
      const rows = sections.map(
        (s) =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(s.metric)] }),
              new TableCell({ children: [new Paragraph({ text: s.stat, alignment: AlignmentType.CENTER })] }),
              new TableCell({ children: [new Paragraph({ text: s.status, alignment: AlignmentType.CENTER })] }),
            ],
          })
      );

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({ text: "KLE SOCIETY'S P. C. JABIN SCIENCE COLLEGE", bold: true, alignment: AlignmentType.CENTER, size: 24 }),
              new Paragraph({ text: report.department, bold: true, alignment: AlignmentType.CENTER, size: 20 }),
              new Paragraph({ text: `ACADEMIC REPORT: ${report.title.toUpperCase()}`, bold: true, alignment: AlignmentType.CENTER, size: 26, spacing: { before: 200, after: 200 } }),
              new Paragraph({ text: `Date: ${report.date} | Prepared By: ${report.preparedBy} (${report.designation})`, bold: true }),
              new Paragraph({ text: `Reporting Period: ${report.period}`, spacing: { after: 200 } }),
              new Paragraph({ text: "EXECUTIVE SUMMARY", bold: true }),
              new Paragraph({ text: report.summary, spacing: { after: 200 } }),
              new Paragraph({ text: "KEY PERFORMANCE METRICS", bold: true }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ text: "Metric Description", bold: true })] }),
                      new TableCell({ children: [new Paragraph({ text: "Value / Output", bold: true, alignment: AlignmentType.CENTER })] }),
                      new TableCell({ children: [new Paragraph({ text: "Status", bold: true, alignment: AlignmentType.CENTER })] }),
                    ],
                  }),
                  ...rows,
                ],
              }),
              new Paragraph({ text: "KEY OUTCOMES & OBSERVATIONS", bold: true, spacing: { before: 200 } }),
              new Paragraph({ text: report.outcomes, spacing: { after: 300 } }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Report_${report.title.replace(/[^a-zA-Z0-9]/g, "_")}.docx`);
      showToast("Word Report downloaded!", "success");
    } catch (e) {
      console.error(e);
      showToast("Word export failed", "error");
    }
  };

  const downloadPDF = async () => {
    try {
      const element = document.getElementById("notice-document");
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imageWidth = 210;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      pdf.addImage(imageData, "PNG", 0, 0, imageWidth, imageHeight);
      pdf.save(`Report_${report.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
      showToast("PDF Report downloaded!", "success");
    } catch (e) {
      console.error(e);
      showToast("PDF export failed", "error");
    }
  };

  return (
    <div className="notice-page">
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <CheckCircle2 size={18} />
          <span>{toast.msg}</span>
        </div>
      )}

      <header className="notice-topbar">
        <button
          className="back-button"
          onClick={() => setCurrentPage("teacher")}
          type="button"
        >
          <ArrowLeft size={18} />
          <span>Dashboard</span>
        </button>

        <div className="topbar-title">
          <FileSpreadsheet size={19} className="title-icon" />
          <span>Academic Report Builder</span>
        </div>

        <div className="notice-actions">
          <button className="save-button" onClick={handleSave} type="button">
            <Save size={16} />
            <span>Save</span>
          </button>
          <button className="print-button" onClick={() => window.print()} type="button">
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button className="word-button" onClick={downloadWord} type="button">
            <Download size={16} />
            <span>Word</span>
          </button>
          <button className="pdf-button" onClick={downloadPDF} type="button">
            <Download size={16} />
            <span>PDF</span>
          </button>
        </div>
      </header>

      <div className="notice-workspace">
        <aside className="notice-editor">
          <div className="editor-header">
            <h2>Report Details</h2>
            <p className="editor-description">Fill report fields to update the preview on the right.</p>
          </div>

          <div className="editor-section">
            <h3 className="section-heading">Basic Information</h3>
            <div className="editor-field">
              <label>Report Title</label>
              <input
                type="text"
                value={report.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="editor-field">
              <label>Report Date</label>
              <input
                type="text"
                value={report.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className="editor-field">
              <label>Department</label>
              <input
                type="text"
                value={report.department}
                onChange={(e) => handleChange("department", e.target.value)}
              />
            </div>
            <div className="editor-field">
              <label>Prepared By</label>
              <input
                type="text"
                value={report.preparedBy}
                onChange={(e) => handleChange("preparedBy", e.target.value)}
              />
            </div>
            <div className="editor-field">
              <label>Reporting Period</label>
              <input
                type="text"
                value={report.period}
                onChange={(e) => handleChange("period", e.target.value)}
              />
            </div>
          </div>

          <div className="editor-section">
            <h3 className="section-heading">Report Body</h3>
            <div className="editor-field">
              <label>Executive Summary</label>
              <textarea
                rows={4}
                value={report.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
              />
            </div>
            <div className="editor-field">
              <label>Key Outcomes & Observations</label>
              <textarea
                rows={4}
                value={report.outcomes}
                onChange={(e) => handleChange("outcomes", e.target.value)}
              />
            </div>
          </div>

          <div className="editor-section">
            <div className="schedule-editor-header">
              <h3>Key Performance Metrics</h3>
              <button type="button" className="add-row-button" onClick={addSectionRow}>
                <Plus size={15} /> Add Row
              </button>
            </div>
            {sections.map((row, idx) => (
              <div key={idx} className="schedule-edit-row">
                <div className="row-input-group full-width">
                  <label>Metric Description</label>
                  <input
                    value={row.metric}
                    onChange={(e) => handleSectionChange(idx, "metric", e.target.value)}
                  />
                </div>
                <div className="row-input-group">
                  <label>Value / Stat</label>
                  <input
                    value={row.stat}
                    onChange={(e) => handleSectionChange(idx, "stat", e.target.value)}
                  />
                </div>
                <div className="row-input-group">
                  <label>Status</label>
                  <input
                    value={row.status}
                    onChange={(e) => handleSectionChange(idx, "status", e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="delete-row-button"
                  onClick={() => removeSectionRow(idx)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <main className="notice-preview-area">
          <div className="preview-toolbar">
            <span className="preview-label">
              <Sparkles size={15} /> Live Report Preview
            </span>
          </div>

          <div id="notice-document" className="notice-document">
            <div className="college-header">
              <div className="header-top-row">
                <img className="college-logo" src={kleLogo} alt="KLE Emblem" />
                <div className="college-title-block">
                  <h3 className="society-name">KLE SOCIETY'S</h3>
                  <h1 className="college-name">P. C. JABIN SCIENCE COLLEGE</h1>
                  <h4 className="autonomy-tag">AUTONOMOUS, CPE PHASE - III</h4>
                  <p className="sub-text">AFFILIATED TO KARNATAK UNIVERSITY DHARWAD</p>
                  <p className="address-text">VIDYANAGAR, HUBBALLI-580031</p>
                </div>
              </div>
              <div className="header-divider" />
              <h2 className="department-title">{report.department}</h2>
            </div>

            <div className="notice-date-row">
              <span>Ref: KLE/BCA/2026/REP-042</span>
              <div className="date-block">
                <strong>Date:</strong> {report.date}
              </div>
            </div>

            <h2 className="notice-heading" style={{ fontSize: "20px" }}>
              ACADEMIC & PERFORMANCE REPORT
            </h2>

            <p style={{ margin: "10px 0 20px 0", fontSize: "14px" }}>
              <strong>Title:</strong> {report.title} <br />
              <strong>Period:</strong> {report.period} | <strong>Submitted By:</strong> {report.preparedBy}
            </p>

            <div className="schedule-section">
              <h3 className="schedule-heading">1. Executive Summary</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.7", textAlign: "justify" }}>
                {report.summary}
              </p>
            </div>

            <div className="schedule-section">
              <h3 className="schedule-heading">2. Performance Metrics</h3>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Metric Description</th>
                    <th>Value / Stat</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((sec, i) => (
                    <tr key={i}>
                      <td>{sec.metric}</td>
                      <td>{sec.stat}</td>
                      <td>{sec.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="schedule-section">
              <h3 className="schedule-heading">3. Key Outcomes & Recommendations</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.7", whitespace: "pre-line" }}>
                {report.outcomes}
              </p>
            </div>

            <div className="signature-section" style={{ marginTop: "60px" }}>
              <div className="signature-box">
                <div className="sig-line" />
                <span className="sig-name">{report.preparedBy}</span>
                <span className="sig-title">Faculty / Staff</span>
              </div>
              <div className="signature-box">
                <div className="sig-line" />
                <span className="sig-name">{report.coordinatorName}</span>
                <span className="sig-title">Coordinator</span>
              </div>
              <div className="signature-box">
                <div className="sig-line" />
                <span className="sig-name">{report.principalName}</span>
                <span className="sig-title">Principal</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateReport;
