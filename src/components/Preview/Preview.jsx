import styles from "./preview.module.scss";
import { Document, Page, Text, Image, View, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";
import Template4 from "./Templates/Template4";

const PDF = ({ template, rows, currencySymbol, formName, logo, email, businessName, address, city, zipcode, phone, owner, clientName, clientEmail, clientAddress, clientCity, clientZipcode, clientPhone, date, InvoiceNo, website, notes }) => {
  const [totalAmount, setTotalAmount] = useState(null);
  
  // Register fonts

  Font.register({
    family: 'League',
    src: "/assets/LeagueSpartan-Bold.ttf",
  });

  Font.register({
    family: 'Garet',
    src: "/assets/Garet-Book.ttf",
  });

  Font.register({
    family: 'Garet-Heavy',
    src: "/assets/Garet-Heavy.ttf",
  });

  const styles = StyleSheet.create({
    body: {
      backgroundColor: '#FCFBF8',
      padding: 40,
      paddingTop: 30,
      color:'#4C3D3D',
      fontFamily: 'Garet'
    },
    invoice_group: {
      flexGrow: 1
    },
    section: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      flexGrow: 1,
      borderBottom: '0.5px solid #000000',

      '@media max-width: 400': {
        width: 300,
      },
    },
    logo_wrapper: {
      width: '150',
      height: '150',
      marginTop: 30,
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    header_details: {
      paddingRight: '25'
    },
    formName: {
      fontSize: '40px',
      fontFamily: 'League',
      textTransform: 'uppercase',
      marginBottom: 10
    },
    bizName: {
      fontSize: '30px',
      fontFamily: 'League',
    },
    invoice_body: {
      marginBottom: 20
    },
    font: {
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: 1
    },
    invoice__details: {
      margin: '20px 0',
      fontFamily: 'Garet-Heavy'
    },
    invoice_header: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '20px',
      marginBottom: '20px',
      fontFamily: 'Garet-Heavy',
    },
    table_header: {
      fontSize: '12px',
      textTransform: 'uppercase',
    },
    item: {
      fontSize: '12px'
    },
    invoice_items: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '20px 0',
      fontSize: '18px',
    },
    total_section: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '0.5px solid #000000',
      borderBottom: '0.5px solid #000000',
      paddingTop: 20,
      paddingBottom: 20,
    },
    total_amount: {
      fontSize: '24px'
    },
    sub: {
      flexGrow: 1,
      flexDirection: 'row',
    },
    sub_section: {
      marginRight: '30'
    },
    des__group: {
      width: '55%',
      textAlign: 'left',
    },
    notes: {
      marginTop: 10,
      marginBottom: 30,
      fontSize: '10px',
      color:'#4C3D3D'
    },
    footer: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 50,
    }
    // template 3
    
  })

  const handleTotalCalculation = () => {
    let sum = 0;
    rows.forEach(row => {
      sum += parseFloat(row.amount);
    })
    setTotalAmount(sum.toFixed(2));
  }

  useEffect(() => {
    handleTotalCalculation();
  }, [])

  return ( 
    <Document
      author={owner}
      keywords="invoice, receipt"
      subject={`${businessName} Invoice`}
      title="Invoice"
    >
      {template === 'template1' && <Page size="A4" style={styles.body}>
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <View style={styles.section}>
            <View style={styles.header_details}>
              {formName && <Text style={styles.formName}>{formName}</Text>}
              {businessName && <Text style={styles.bizName}>{businessName}</Text>}

              <View style={styles.invoice__details}>
                {InvoiceNo && <Text style={styles.font}>Invoice No. {InvoiceNo}</Text>}
                <Text style={styles.font}>{date}</Text>
              </View>

              <Text style={styles.font}>Billed To:</Text>
              {clientName && <Text style={styles.font}>{clientName}</Text>}
              {clientAddress && <Text style={styles.font}>{clientAddress}</Text>}
              <Text style={styles.font}>{clientCity} {clientZipcode}</Text>
            </View>
            <View style={styles.logo_wrapper}>
              <Image src={logo} style={styles.logo}/>
            </View>
          </View>
          <View style={styles.invoice_group}>
            <View style={styles.invoice_body}>
              <View style={styles.invoice_header}>
                <Text style={[styles.table_header, {width: '55%'}]}>DESCRIPTION</Text>
                <Text style={[styles.table_header, {width: '15%', textAlign: 'center'}]}>PRICE</Text>
                <Text style={[styles.table_header, {width: '15%', textAlign: 'center'}]}>QTY</Text>
                <Text style={[styles.table_header, {width: '15%', textAlign: 'right'}]}>AMOUNT</Text>
              </View>

              {rows.map(({ id, description, details, rate, quantity, amount }) => (
                <View style={styles.invoice_items} key={id}>
                  <View style={styles.des__group}>
                    <Text style={[styles.item, { marginBottom: '10', fontSize: '14' }]}>{description}</Text>
                    <Text style={{fontSize: '10', opacity: 0.8, width: '95%'}}>{details}</Text>
                  </View>
                  <Text style={[styles.item, {width: '15%', textAlign: 'center'}]}>{currencySymbol}{rate ? rate.toFixed(2) : '0.00'}</Text>
                  <Text style={[styles.item, {width: '15%', textAlign: 'center'}]}>{quantity}</Text>
                  <Text style={[styles.item, {width: '15%', textAlign: 'right'}]}>{currencySymbol}{amount}</Text>
                </View>
              ))}
            </View>
            <View style={styles.total_section}>
              {/* <View style={styles.sub}>
                <View style={styles.sub_section}>
                  <Text style={styles.table_header}>SUBTOTAL</Text>
                  <Text style={styles.item}>$500.00</Text>
                </View>
                <View>
                  <Text style={styles.table_header}>VAT</Text>
                  <Text style={styles.item}>$50.00</Text>
                </View>
              </View> */}
              {/* <View style={styles.total}> */}
                <Text style={styles.table_header}>TOTAL</Text>
                <Text style={styles.total_amount}>{currencySymbol}{totalAmount}</Text>
              {/* </View> */}
            </View>
            <Text style={styles.notes}>{notes}</Text>
            <View style={styles.footer}>
              <Text style={styles.item}>{owner}</Text>
              <Text style={styles.item}>____________________________</Text>
            </View>
          </View>
        </View>
      </Page>}
      {template === 'template2' && 
        <Template2 
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          city={city}
          zipcode={zipcode}
          website={website}
        /> 
      }
      {template === 'template3' && 
        <Template3 
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          city={city}
          zipcode={zipcode}
          email={email}
          phone={phone}
          website={website}
        /> 
      }
      {template === 'template4' && 
        <Template4 
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          city={city}
          zipcode={zipcode}
          phone={phone}
          website={website}
        /> 
      }

    </Document>
   );
}

const PDFView = ({ template, rows, currencySymbol, formName, logo, email, businessName, address, city, zipcode, phone, owner, clientName, clientAddress, clientEmail, clientCity, clientZipcode, clientPhone, date, InvoiceNo, website, notes }) => {
  

  // const saveInvoice = () => {
  //   console.log('saved');
  // }

  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, [])
  
  return ( 
    <>
      <PDFViewer className={styles.full}>
        <PDF 
          template={template}
          rows={rows}
          email={email} 
          businessName={businessName}
          formName={formName}
          logo={logo}
          address={address}
          city={city}
          zipcode={zipcode}
          phone={phone}
          owner={owner}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          date={date}
          InvoiceNo={InvoiceNo}
          website={website}
          notes={notes}
          currencySymbol={currencySymbol}
          >
        </PDF>
      </PDFViewer>
    </>
   );
}
 
export default PDFView;
// export default PDF;