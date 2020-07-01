import React, { useContext } from 'react'
import { PDFDownloadLink, Document, Image, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'
import { lineTypeEnum } from '../../model/enums'
const shortDateFormat = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    color: 'grey',
    fontWeight: 'bold'
    
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  date: {
    textAlign: 'right',
    color: 'grey',
    fontSize: 10
  },
  score: {
    margin: 12,
    textAlign: 'right',
    right: 10,
    fontSize: 10
  },
  freeLine: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#e6f2ff'
  },
  fixedLine: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#e6f2ff'
  },
  comments: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'left',
  },
  icon: {
    alignContent: 'left',
    marginBottom: 15,
    height: 48,
    width: 48
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});
export default function ChecklistPDF({checklistInstance}){
  const MyDoc = () => (
    <Document>
      <Page style={styles.body}>
        <Image source={'https://cors-anywhere.herokuapp.com/' + 'https://img.icons8.com/cotton/64/000000/factory-1.png'} style={styles.icon} fixed/>
        <Text style={styles.title}>
          {checklistInstance.checklist_id.name}
        </Text>
        <Text style={styles.author}>
          Realizado por {checklistInstance.user_id.fullname} | 
          Supervisado por {checklistInstance.lineSupervisor}
        </Text>
        <Text style={styles.date}>
          {shortDateFormat(checklistInstance.updatedAt)}
        </Text>
        <View>
          {checklistInstance.content !== undefined && checklistInstance.content.map(section => {
            return (<Section section={section} />)
          })}
        </View>
        <Text style={styles.subtitle} break>
          Comentarios
        </Text>
        <Text style={styles.comments}>
          {checklistInstance.comments.reduce((prev, current) => prev.concat(current + '\n'), '')}
        </Text>
     
      </Page>
    </Document>
  )
  const Section = ({section}) => {
    return (
      <View style={styles.freeLine}>
        <Text style={styles.subtitle}>
          {section.section}
        </Text>
        {section.checkpoints.map((checkpoint) => {
              return (
                <Checkpoint checkpoint={checkpoint}/>
              )
          })}
      </View>
    )
  }
  const Checkpoint = ({checkpoint}) => {
    return (
      <View style={styles.freeLine}>
      <Text style={styles.subtitle}>
        {checkpoint.name}
      </Text>
      <Text style={styles.score}>
        Puntuación: {checkpoint.score}
      </Text>
      {checkpoint.observations.map((observation) => {
            return (
              <View style={styles.freeLine}>
                <Text style={styles.text}>
                  {observation.text}
                </Text>
                {observation.images.map((image) => (
                  <Image source={'https://cors-anywhere.herokuapp.com/' + image} style={styles.image} wrap
                  />
                ))}
              </View>
            )
        })}
    </View>
    )
  }
  const Fixedlinexcontent = ({checkpoint}) => {
    return (
      <View style={styles.fixedLine}>
        <Text style={styles.subtitle}>
          {checkpoint.name} {checkpoint.fixedValues[0]._value}
        </Text>
        <Text style={styles.score}>
          Puntuación: {checkpoint.score}
        </Text>
      </View>
    )
  }
  const FreelinesContent = ({checkpoint}) => {
    return (
      <View style={styles.freeLine}>
        <Text style={styles.subtitle}>
          {checkpoint.name}
        </Text>
        <Text style={styles.score}>
          Puntuación: {checkpoint.score}
        </Text>
        {checkpoint.freeValues.map((freeValue) => {
              return (
                <View style={styles.freeLine}>
                  <Text style={styles.text}>
                    {freeValue.text}
                  </Text>
                  {freeValue.images.map((image) => (
                    <Image source={'https://cors-anywhere.herokuapp.com/' + image} style={styles.image} wrap
                    />
                  ))}
                </View>
              )
          })}
      </View>
    )
  }

  return (
    <PDFDownloadLink document={<MyDoc />} fileName={checklistInstance._id}>
            {({ blob, url, loading, error }) => (loading ? 'Generando documento...' : 'Descargar')}
    </PDFDownloadLink>
  )
}