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
  VerticalMergeType,
  ImageRun,
} from "docx";

import kleSocietyLogo from "../assets/kle-centenary-logo.jpg";

/* =====================================================
   FONTS / COLORS — taken directly from the official
   KLE Notice.docx letterhead (not eyeballed)
===================================================== */

const CAMBRIA = "Cambria";
const TIMES = "Times New Roman";
const BLUE = "0070C0";
const RED = "FF0000";
const MAROON = "943634";

/* =====================================================
   HELPERS
===================================================== */

const formatDate = (value) => {
  if (!value) return "";

  // Handles both "YYYY-MM-DD" (from <input type="date">)
  // and already-formatted strings.
  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
};

// Fetches the imported logo asset (a bundler-resolved URL)
// and returns it as an ArrayBuffer so docx's ImageRun can use it.
async function loadLogoBuffer() {
  const response = await fetch(kleSocietyLogo);
  return await response.arrayBuffer();
}

const cellText = (text, { bold = false } = {}) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text, bold, size: 32, font: TIMES }),
    ],
  });

/* =====================================================
   DOWNLOAD NOTICE AS WORD
===================================================== */

export async function downloadNoticeAsWord(values) {
  try {
    if (!values) {
      alert("No Notice selected.");
      return;
    }

    const logoBuffer = await loadLogoBuffer();

    const noticeDate = values.noticeDate || values.date || "";
    const semester = values.semester || "II semester";
    const activityType = values.activityType || "Seminar";
    const topic = values.topic || "Cloud Computing";
    const classroom = values.classroom || "Hall no 03";
    const eventDate = values.eventDate || "";
    const scheduleTitle = values.scheduleTitle || "Seminar Schedule";
    const note = values.note || "Attendance is Mandatory.";

    const scheduleRows =
      Array.isArray(values.schedule) && values.schedule.length > 0
        ? values.schedule
        : [
            { timing: "10:00 am to 1:00 pm", date: "", division: "A1, A2, A3" },
            { timing: "2:00 pm to 5:00 pm", date: "", division: "A4, A5, A6" },
          ];

    /* =================================================
       LETTERHEAD (logo + college header block)
    ================================================= */

    const headerParagraphs = [

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: { width: 76, height: 76 },
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
            size: 40,
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
          top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        },
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text: "BACHELOR OF COMPUTER APPLICATION",
            bold: true,
            size: 32,
            font: TIMES,
          }),
        ],
      }),

    ];

    /* =================================================
       DATE
    ================================================= */

    const dateParagraph = new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 300, after: 0 },
      children: [
        new TextRun({ text: "Date: ", bold: true, size: 28, font: TIMES }),
        new TextRun({ text: formatDate(noticeDate), bold: true, size: 28, font: TIMES }),
      ],
    });

    /* =================================================
       NOTICE HEADING
    ================================================= */

    const noticeHeading = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
      children: [
        new TextRun({ text: "Notice", bold: true, size: 40, font: TIMES, underline: {} }),
      ],
    });

    /* =================================================
       BODY PARAGRAPH
    ================================================= */

    const bodyParagraph = new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { line: 360, lineRule: "auto", after: 200 },
      children: [
        new TextRun({ text: "All the students of ", size: 32, font: TIMES }),
        new TextRun({ text: semester, bold: true, size: 32, font: TIMES }),
        new TextRun({ text: " are hereby informed to attend ", size: 32, font: TIMES }),
        new TextRun({ text: `${activityType} on “`, size: 32, font: TIMES }),
        new TextRun({ text: topic, bold: true, size: 36, font: TIMES }),
        new TextRun({ text: `” in ${classroom} on `, size: 32, font: TIMES }),
        new TextRun({ text: formatDate(eventDate) || "19/05/2026", bold: true, size: 32, font: TIMES }),
        new TextRun({ text: ".", size: 32, font: TIMES }),
      ],
    });

    /* =================================================
       SCHEDULE TABLE
    ================================================= */

    const COL_W = [2977, 3274, 2821];

    const headerRow1 = new TableRow({
      children: [
        new TableCell({
          columnSpan: 3,
          width: { size: 9072, type: WidthType.DXA },
          children: [cellText(scheduleTitle, { bold: true })],
        }),
      ],
    });

    const headerRow2 = new TableRow({
      children: [
        new TableCell({ width: { size: COL_W[0], type: WidthType.DXA }, children: [cellText("Timing", { bold: true })] }),
        new TableCell({ width: { size: COL_W[1], type: WidthType.DXA }, children: [cellText("Date", { bold: true })] }),
        new TableCell({ width: { size: COL_W[2], type: WidthType.DXA }, children: [cellText("Division", { bold: true })] }),
      ],
    });

    const dataRows = scheduleRows.map((row, index) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: COL_W[0], type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            children: [cellText(row.timing || "—")],
          }),
          new TableCell({
            width: { size: COL_W[1], type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            verticalMerge: index === 0 ? VerticalMergeType.RESTART : VerticalMergeType.CONTINUE,
            children:
              index === 0
                ? [cellText(formatDate(row.date) || formatDate(eventDate) || "19/05/2026")]
                : [new Paragraph({ children: [] })],
          }),
          new TableCell({
            width: { size: COL_W[2], type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            children: [cellText(row.division || "—")],
          }),
        ],
      })
    );

    const scheduleTable = new Table({
      width: { size: 9072, type: WidthType.DXA },
      columnWidths: COL_W,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      },
      rows: [headerRow1, headerRow2, ...dataRows],
    });

    /* =================================================
       NOTE
    ================================================= */

    const noteParagraph = new Paragraph({
      spacing: { before: 260, after: 0 },
      children: [
        new TextRun({ text: "NOTE: ", bold: true, size: 32, font: TIMES }),
        new TextRun({ text: note, bold: true, size: 32, font: TIMES }),
      ],
    });

    /* =================================================
       SIGNATURES (borderless 3-column table keeps the
       three labels evenly spread, matching the original)
    ================================================= */

    const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

    const sigCell = (text) =>
      new TableCell({
        width: { size: 3024, type: WidthType.DXA },
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
        children: [
          new Paragraph({
            children: [new TextRun({ text, bold: true, size: 24, font: TIMES })],
          }),
        ],
      });

    const signatureTable = new Table({
      width: { size: 9072, type: WidthType.DXA },
      columnWidths: [3024, 3024, 3024],
      borders: {
        top: noBorder,
        bottom: noBorder,
        left: noBorder,
        right: noBorder,
        insideHorizontal: noBorder,
        insideVertical: noBorder,
      },
      rows: [
        new TableRow({
          children: [
            sigCell("Seminar Coordinators"),
            sigCell("Academic Coordinator"),
            sigCell("Principal"),
          ],
        }),
      ],
    });

    /* =================================================
       DOCUMENT
    ================================================= */

    const doc = new Document({
      creator: "KLE PC Jabin Science College",
      title: topic ? `Notice - ${topic}` : "KLE College Notice",
      description: "Official KLE PC Jabin Science College Notice",

      sections: [
        {
          properties: {
            page: {
              size: { width: 12240, height: 15840 },
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720 },
            },
          },

          children: [
            ...headerParagraphs,
            dateParagraph,
            noticeHeading,
            bodyParagraph,
            scheduleTable,
            noteParagraph,
            new Paragraph({ spacing: { before: 1200 }, children: [] }),
            signatureTable,
          ],
        },
      ],
    });

    /* =================================================
       GENERATE + DOWNLOAD
    ================================================= */

    const blob = await Packer.toBlob(doc);

    const safeTopic = topic
      ? topic.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_")
      : "Notice";

    const fileName = `KLE_Notice_${safeTopic}.docx`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error generating Word Notice:", error);
    alert("Unable to download the Notice. Please try again.");
  }
}