import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  VerticalAlign,
  ImageRun,
} from "docx";

import kleSocietyLogo from "../assets/kle-centenary-logo.jpg";

const CAMBRIA = "Cambria";
const TIMES = "Times New Roman";
const BLUE = "0070C0";
const RED = "FF0000";
const MAROON = "943634";

async function loadLogoBuffer() {
  const response = await fetch(kleSocietyLogo);
  return await response.arrayBuffer();
}

const labelCell = (text) =>
  new TableCell({
    width: { size: 3149, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text, bold: true, size: 22, font: TIMES }),
        ],
      }),
    ],
  });

const valueCell = (lines) =>
  new TableCell({
    width: { size: 6691, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: (Array.isArray(lines) ? lines : [lines]).map(
      (line) =>
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({ text: line || "—", size: 22, font: TIMES }),
          ],
        })
    ),
  });
const row = (label, value) =>
  new TableRow({ children: [labelCell(label), valueCell(value)] });

export async function downloadClgFormatAsWord(values) {
  try {
    if (!values) {
      alert("No College Format selected.");
      return;
    }

    const logoBuffer = await loadLogoBuffer();

    const topic = values.topic || "Cloud Computing";

    const enclosedLines = (values.enclosedWithReport || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const headerParagraphs = [

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: { width: 100, height: 96 },
            floating: {
              horizontalPosition: { relative: "page", offset: 685800 },
              verticalPosition: { relative: "page", offset: 685800 },
              wrap: { type: "square", side: "both" },
              behindDocument: true,
              allowOverlap: true,
            },
          }),
          new TextRun({ text: "KLE SOCIETY’S", bold: true, size: 18, font: CAMBRIA }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "P. C. JABIN SCIENCE COLLEGE",
            bold: true,
            size: 36,
            font: CAMBRIA,
            color: RED,
          }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({ text: "AUTONOMOUS", bold: true, size: 22, font: CAMBRIA, color: BLUE }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "AFFILIATED TO KARNATAK UNIVERSITY DHARWAD",
            bold: true,
            size: 12,
            font: CAMBRIA,
            color: BLUE,
          }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND",
            bold: true,
            size: 12,
            font: CAMBRIA,
            color: BLUE,
          }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: "GOVERNMENT OF KARNATAKA",
            bold: true,
            size: 12,
            font: CAMBRIA,
            color: BLUE,
          }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({ text: "Accredited at ‘A", bold: true, size: 22, font: CAMBRIA, color: MAROON }),
          new TextRun({ text: "++", bold: true, size: 22, font: CAMBRIA, color: MAROON, superScript: true }),
          new TextRun({ text: "’ Grade with 3.54 CGPA by NAAC", bold: true, size: 22, font: CAMBRIA, color: MAROON }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "VIDYANAGAR, HUBBALLI-580031",
            bold: true,
            size: 22,
            font: CAMBRIA,
            color: MAROON,
          }),
        ],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          top: { style: BorderStyle.SINGLE, size: 8, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 8, color: "000000" },
        },
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text: "BACHELOR OF COMPUTER APPLICATION",
            bold: true,
            size: 28,
            font: TIMES,
          }),
        ],
      }),

    ];

    const subtitleParagraph = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 220 },
      children: [
        new TextRun({ text: `Seminar on “${topic}”`, bold: true, size: 32, font: TIMES }),
      ],
    });

    const detailsTable = new Table({
      width: { size: 9072, type: WidthType.DXA },
      columnWidths: [2900, 6172],
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      },
      rows: [
        row("Date of Workshop", values.dateOfWorkshop),
        row("Time and Duration", values.timeAndDuration),
        row("Seminar Organized For", values.organizedFor),
        row("Objective", values.objective),
        row("Resource Person’s Details", values.resourcePersonDetails),
        row("Faculty Coordinator", values.facultyCoordinator),
        row("Resource Person’s Receival & Hospitality Managed by", values.receivalHospitality),
        row("Resource Person Introduction by", values.introductionBy),
        row("Vote of Thanks Delivered by", values.voteOfThanks),
        row("Photography Managed by", values.photography),
        row("Feedback Link shared by", values.feedbackLink),
        row("Number of Students Present", values.studentsPresent),
        row("Enclosed with Report", enclosedLines.length > 0 ? enclosedLines : "—"),
      ],
    });

    const signatureLine = new Paragraph({
      spacing: { before: 500, after: 60 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
      },
      children: [new TextRun({ text: "                              ", size: 22 })],
    });

    const signatureLabel = new Paragraph({
      spacing: { after: 0 },
      children: [
        new TextRun({
          text: "Signature of Faculty Coordinators",
          bold: true,
          size: 22,
          font: TIMES,
        }),
      ],
    });

    const doc = new Document({
      creator: "KLE PC Jabin Science College",
      title: `College Format - ${topic}`,
      description: "Official KLE PC Jabin Science College Seminar Report",

      sections: [
        {
          properties: {
            page: {
              size: { width: 12240, height: 15840 },
              margin: { top: 1000, right: 1200, bottom: 1000, left: 1200, header: 720, footer: 720 },
            },
          },

          children: [
            ...headerParagraphs,
            subtitleParagraph,
            detailsTable,
            signatureLine,
            signatureLabel,
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const safeTopic = topic
      ? topic.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_")
      : "College_Format";

    const fileName = `KLE_College_Format_${safeTopic}.docx`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error generating Word College Format:", error);
    alert("Unable to download the College Format. Please try again.");
  }
}