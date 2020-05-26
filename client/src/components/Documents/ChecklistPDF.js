import React, { useContext } from 'react'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

export default function ChecklistPDF({checklistInstance}){
  const MyDoc = () => (
    <Document>
      <Page>
        <Text>
          {JSON.stringify(checklistInstance)}
        </Text>
      </Page>
    </Document>
  )
  
  return (
    <PDFDownloadLink document={<MyDoc />} fileName={"aname.pdf"}>
            {({ blob, url, loading, error }) => (loading ? 'Generando documento...' : 'Descargar')}
    </PDFDownloadLink>
  )
}