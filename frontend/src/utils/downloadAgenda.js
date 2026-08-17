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

/* =====================================================
   FONTS / COLORS — same values used in downloadNotice.js,
   taken from the official KLE letterhead.
===================================================== */

const CAMBRIA = "Cambria";
const TIMES = "Times New Roman";
const BLUE = "0070C0";
const RED = "FF0000";
const MAROON = "943634";

/* =====================================================
   HELPERS
===================================================== */

async function loadLogoBuffer() {
  const response = await fetch(kleSocietyLogo);
  return await response.arrayBuffer();
}

const cellText = (text, { bold = false } = {}) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text, bold, size: 26, font: TIMES }),
    ],
  });

/* =====================================================
   DOWNLOAD AGENDA AS WORD
===================================================== */

export async function downloadAgendaAsWord(values) {
  try {
    if (!values) {
      alert("No Agenda selected.");
      return;
    }

    const logoBuffer = await loadLogoBuffer();

    const courseTitle =
      values.courseTitle || "BACHELOR OF COMPUTER APPLICATION";
    const topic = values.topic || "Cloud Computing";

    const rows =
      Array.isArray(values.rows) && values.rows.length > 0
        ? values.rows
        : [{ time: "", activity: "", person: "" }];

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
            text: courseTitle,
            bold: true,
            size: 32,
            font: TIMES,
          }),
        ],
      }),

    ];

    /* =================================================
       TOPIC + AGENDA HEADING
    ================================================= */

    const topicParagraph = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 260 },
      children: [
        new TextRun({ text: `“${topic}”`, bold: true, size: 36, font: TIMES }),
      ],
    });

    const agendaHeading = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({ text: "AGENDA", bold: true, size: 28, font: TIMES, underline: {} }),
      ],
    });

    /* =================================================
       AGENDA TABLE
    ================================================= */

    const COL_W = [3628, 5444];

    const headerRow = new TableRow({
      children: [
        new TableCell({ width: { size: COL_W[0], type: WidthType.DXA }, children: [cellText("Time", { bold: true })] }),
        new TableCell({ width: { size: COL_W[1], type: WidthType.DXA }, children: [cellText("Specifications", { bold: true })] }),
      ],
    });

    const dataRows = rows.map(
      (row) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: COL_W[0], type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [cellText(row.time || "—")],
            }),
            new TableCell({
              width: { size: COL_W[1], type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [
                cellText(row.activity || "—"),
                ...(row.person ? [cellText(row.person)] : []),
              ],
            }),
          ],
        })
    );

    const agendaTable = new Table({
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
      rows: [headerRow, ...dataRows],
    });

    /* =================================================
       DOCUMENT
    ================================================= */

    const doc = new Document({
      creator: "KLE PC Jabin Science College",
      title: topic ? `Agenda - ${topic}` : "KLE College Agenda",
      description: "Official KLE PC Jabin Science College Agenda",

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
            topicParagraph,
            agendaHeading,
            agendaTable,
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
      : "Agenda";

    const fileName = `KLE_Agenda_${safeTopic}.docx`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error generating Word Agenda:", error);
    alert("Unable to download the Agenda. Please try again.");
  }
}