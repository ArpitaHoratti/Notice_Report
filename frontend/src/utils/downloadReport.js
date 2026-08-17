import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";


export async function downloadReportAsWord(values = {}) {

  const safe = {
    programTitle:
      values.programTitle ||
      "BACHELOR OF COMPUTER APPLICATION",

    reportTitle:
      values.reportTitle ||
      "Program Report on “Cloud Computing” Seminar",

    eventDate:
      values.eventDate ||
      "19th May 2026",

    organiser:
      values.organiser ||
      "Department of BCA",

    eventName:
      values.eventName ||
      "Cloud Computing",

    dateOfEvent:
      values.dateOfEvent ||
      "19/05/2026",

    participants:
      values.participants ||
      "298",

    resourcePerson:
      values.resourcePerson ||
      "Miss. Nagaveni Neelgar",

    objective:
      values.objective ||
      "",

    outcome:
      values.outcome ||
      "",

    eventDescription:
      values.eventDescription ||
      "",

    voteOfThanks:
      values.voteOfThanks ||
      "The seminar concluded with a vote of thanks by Mr. Gagan.",
  };


  // =====================================================
  // INFORMATION ROWS
  // =====================================================

  const informationRows = [

    [
      "Name of the Organiser",
      safe.organiser,
    ],

    [
      "Name of the Event organised",
      safe.eventName,
    ],

    [
      "Date of the Event",
      safe.dateOfEvent,
    ],

    [
      "Participants",
      safe.participants,
    ],

    [
      "Name of the Resource person with affiliation",
      safe.resourcePerson,
    ],

    [
      "Objective of the Event",
      safe.objective,
    ],

    [
      "Outcome of the Event",
      safe.outcome,
    ],

  ];


  const tableRows =
    informationRows.map(
      ([label, value]) => (

        new TableRow({

          children: [

            new TableCell({

              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },

              children: [

                new Paragraph({

                  children: [

                    new TextRun({
                      text: label,
                      bold: true,
                      font: "Times New Roman",
                      size: 20,
                    }),

                  ],

                }),

              ],

            }),


            new TableCell({

              width: {
                size: 70,
                type: WidthType.PERCENTAGE,
              },

              children: [

                new Paragraph({

                  children: [

                    new TextRun({
                      text: value,
                      font: "Times New Roman",
                      size: 20,
                    }),

                  ],

                }),

              ],

            }),

          ],

        })

      )
    );


  // =====================================================
  // DOCUMENT
  // =====================================================

  const doc =
    new Document({

      sections: [

        {

          properties: {

            page: {

              size: {
                width: 11906,
                height: 16838,
              },

              margin: {
                top: 700,
                right: 700,
                bottom: 700,
                left: 700,
              },

            },

          },


          children: [

            // =================================================
            // HEADER
            // =================================================

            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: "KLE SOCIETY’S",
                  bold: true,
                  font: "Times New Roman",
                  size: 25,
                }),

              ],

              spacing: {
                after: 30,
              },

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: "P. C. JABIN SCIENCE COLLEGE",
                  bold: true,
                  font: "Times New Roman",
                  size: 31,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: "AUTONOMOUS",
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text:
                    "AFFILIATED TO KARNATAK UNIVERSITY DHARWAD",
                  font: "Times New Roman",
                  size: 17,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text:
                    "APPROVED BY UNIVERSITY GRANTS COMMISSION, NEW DELHI AND",
                  font: "Times New Roman",
                  size: 15,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text:
                    "GOVERNMENT OF KARNATAKA",
                  font: "Times New Roman",
                  size: 15,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text:
                    "Accredited at ‘A++’ Grade with 3.54 CGPA by NAAC",
                  font: "Times New Roman",
                  size: 15,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text:
                    "VIDYANAGAR, HUBBALLI-580031",
                  bold: true,
                  font: "Times New Roman",
                  size: 17,
                }),

              ],

              spacing: {
                after: 220,
              },

            }),


            // =================================================
            // PROGRAM
            // =================================================

            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: safe.programTitle,
                  bold: true,
                  font: "Times New Roman",
                  size: 21,
                }),

              ],

              spacing: {
                after: 160,
              },

            }),


            // =================================================
            // REPORT TITLE
            // =================================================

            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: safe.reportTitle,
                  bold: true,
                  font: "Times New Roman",
                  size: 22,
                }),

              ],

            }),


            new Paragraph({

              alignment:
                AlignmentType.CENTER,

              children: [

                new TextRun({
                  text: `On ${safe.eventDate}`,
                  font: "Times New Roman",
                  size: 20,
                }),

              ],

              spacing: {
                after: 220,
              },

            }),


            // =================================================
            // TABLE
            // =================================================

            new Table({

              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: tableRows,

            }),


            // =================================================
            // DESCRIPTION
            // =================================================

            ...safe.eventDescription
              .split("\n")
              .filter(
                (paragraph) =>
                  paragraph.trim()
              )
              .map(
                (paragraph) => (

                  new Paragraph({

                    children: [

                      new TextRun({
                        text: paragraph,
                        font: "Times New Roman",
                        size: 20,
                      }),

                    ],

                    alignment:
                      AlignmentType.JUSTIFIED,

                    spacing: {
                      before: 180,
                      after: 100,
                      line: 280,
                    },

                  })

                )
              ),


            // =================================================
            // VOTE OF THANKS
            // =================================================

            new Paragraph({

              children: [

                new TextRun({
                  text: safe.voteOfThanks,
                  font: "Times New Roman",
                  size: 20,
                }),

              ],

              alignment:
                AlignmentType.JUSTIFIED,

              spacing: {
                before: 120,
              },

            }),


            // =================================================
            // PHOTO GALLERY
            // =================================================

            new Paragraph({

              children: [

                new TextRun({
                  text: "Photo Gallery",
                  bold: true,
                  font: "Times New Roman",
                  size: 21,
                }),

              ],

              spacing: {
                before: 260,
              },

            }),

          ],

        },

      ],

    });


  const blob =
    await Packer.toBlob(doc);


  const filename =
    `Report_${safe.eventName.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}.docx`;


  saveAs(
    blob,
    filename
  );
}