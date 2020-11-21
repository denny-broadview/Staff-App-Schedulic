import React, {useEffect, useState} from 'react';
import {View, Text,TouchableOpacity, _Text, FlatList, ScrollView} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Entypo';
import {String} from '../../../utlis/String';
const invoice = (props) => {
  return (
       <ScrollView> 
     <View style={styles.maininvoice}>
         <View style={styles.sendinvoice}>
          <TouchableOpacity style={styles.button}>
               <Text style={{color: '#fff', fontSize: 16}}>
               {String.invoice.Sendinvoice}
               </Text>
          </TouchableOpacity>   
         </View>
         <View style={{padding:16,flex:1,}}>
              <View style={styles.invoicebottom}>
                    <View style={{padding:12,backgroundColor:'#EEF5FF',height:280}}>
                         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <View>
                                   <Text style={{fontSize:18,color:'#1273F6'}}> {String.invoice.Businessname} </Text>
                                   <Text style={{fontSize:16,color:'#0A0A0A',fontWeight:'bold',marginTop:4}}> Surat,gujarat </Text>
                                   <Text style={{fontSize:16,color:'#0A0A0A',fontWeight:'bold',marginTop:2}}> 392349 Gujarat </Text>
                              </View>
                              <View>
                                   <Text style={{fontSize:22,color:'#1273F6'}}>{String.invoice.invoicename} </Text>
                              </View>
                         </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16%'}}>
                              <View>
                                   <Text style={{fontSize:18,color:'#1273F6'}}> {String.invoice.Billname} </Text>
                                   <Text style={{fontSize:16,color:'#6D5959',fontWeight:'bold',marginTop:4}}> Xyz Cutomer </Text>
                                   <Text style={{fontSize:16,color:'#0A0A0A',marginTop:12}}> Surat,gujarat</Text>
                                   <Text style={{fontSize:16,color:'#0A0A0A',}}> 392349 Gujarat </Text>
                                   
                              </View>
                              <View>
                                   <Text style={{fontSize:18,color:'#000000',fontWeight:'bold'}}>{String.invoice.invoicenumber} </Text>
                                   <Text style={{fontSize:16,color:'#000000',textAlign:'right'}}>12345678</Text>
                                   <Text style={{fontSize:18,color:'#000000',fontWeight:'bold',marginTop:12}}>{String.invoice.invoicedate}</Text>
                                   <Text style={{fontSize:16,color:'#000000',textAlign:'right'}}>09 May 2020</Text>
                              </View>
                         </View>
                    </View>
                    <View style={{padding:12}}>
                         <View style={{flexDirection:'row',height:40,justifyContent:'space-between',}}>
                               <Text style={styles.commontopheading}>{String.invoice.Description}</Text>
                              <Text style={styles.commontopheading}> {String.invoice.Amount}</Text>
                              <Text style={styles.commontopheading}> {String.invoice.Unit} </Text>
                              <Text style={styles.commontopheading}> {String.invoice.LineTotal} </Text>
                         </View>
                         <View style={{flexDirection:'row',height:40,justifyContent:'space-between'}}>
                               <Text style={styles.commoncartdetails}>Mackeup</Text>
                              <Text style={styles.commoncartdetails}>₹2,500</Text>
                              <Text style={styles.commoncartdetails}>1</Text>
                              <Text style={styles.commoncartdetails}> ₹2,500.00</Text>
                         </View>
                         <View style={{flexDirection:'row',}}>
                              <View style={{width:'40%',}}>

                              </View>
                             
                              <View style={{width:'60%'}}>
                                   <View style={styles.totalDetails}>
                                        <Text style={{fontSize:16,color:'#1273F6',textAlign:'left'}}> {String.invoice.SubTotal} </Text> 
                                        <Text style={{fontSize:16,color:'#6D5959'}}> ₹2,500.00 </Text> 
                                   </View>
                                   <View style={styles.totalDetails}>
                                         <Text style={{fontSize:16,color:'#1273F6',textAlign:'left'}}> {String.invoice.Discount} </Text> 
                                         <Text style={{fontSize:16,color:'#6D5959'}}>₹500.00</Text> 
                                   </View>
                                   <View style={styles.totalDetails}>
                                         <Text style={{fontSize:16,color:'#1273F6',textAlign:'left'}}>GST (18%) </Text> 
                                         <Text style={{fontSize:16,color:'#6D5959'}}>₹380.00 </Text> 
                                   </View>
                                   <View style={styles.totalDetails}>
                                         <Text style={{fontSize:16,color:'#1273F6',textAlign:'left'}}>CGST (18%)</Text> 
                                         <Text style={{fontSize:16,color:'#6D5959'}}>₹320.00 </Text> 
                                   </View>
                              </View>
                         </View>
                         <View style={{flex:2,backgroundColor:'#ccc',marginTop:24}}>
                              <View style={{flexDirection:'row',height:100,justifyContent:'space-between'}}>
                                        <Text style={{fontSize:20,color:'#6D5959',fontWeight:'bold'}}> 
                                             Total
                                        </Text>
                              
                                        <Text style={{fontSize:20,color:'#1273F6'}}> 
                                        ₹2,680.00
                                        </Text>
                              
                              </View> 
                         </View> 
                        

                    </View>
                    
              </View>
         </View>
     </View>
     </ScrollView>
  );
};
export default invoice;
