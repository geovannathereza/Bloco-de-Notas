//Trabalho feito por Gabriella Lacerda e Geovanna Thereza
import AsyncStorage from "@react-native-async-storage/async-storage";
//instalar o async pra funcionar
//npm install @react-native-async-storage/async-storage dentro do projeto
import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Button, onChangeText, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

//Dimensões de largura e altura para responsivo
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  
  //exemplo
  const [texemplo, settexemplo] = useState([
    {tex: '- Add tarefas diarias', key: 1 },
    {tex: '- O que você vai fazer?', key: 2},
    {tex: '- Não está esquecendo nada?', key: 3},
  ])
 
  //"Apagar" a View do exemplo
  const [exibirView, setexibirView] = useState(true);
  const removerView = () => {
    setexibirView(false);
  };

  //bloco e lista
  const [textVisible, settextVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [lista, setlista] = useState ([]);

  useEffect(() => {
    // Ao carregar o componente, carregue a lista de textos do AsyncStorage
    AsyncStorage.getItem('lista').then(salvalista => {
      if (salvalista){
      setlista(JSON.parse(salvalista));
      }
    });
    
  }, []);
  //Ao clicar no botão, aparecerá a caixinha pra digitar
  const clicarbotao = () => {
      settextVisible(true);
  }

  //Função de salvar o bloquinho no storage
  const savebotao = async () => {
    settextVisible(false);
    // Adiciona o texto inserido a lista e salvar no AsyncStorage
    const newlista = [...lista, inputText];
    setlista(newlista);
    await AsyncStorage.setItem('lista', JSON.stringify(newlista));

      //Limpar texto inserido
      setInputText('');
  };

  //Função de remover o bloquinho do storage
  const removerItem = async (index) => {
    // Remova o item correspondente da lista e salve no AsyncStorage
    const newlista = [...lista];
    newlista.splice(index, 1);
    setlista(newlista);
    await AsyncStorage.setItem('lista', JSON.stringify(newlista));
   
  };


  return (
      
      <View style={styles.container}>
      
        <View style={styles.head}>
          <Text style={styles.texhead}>My Notes</Text>

          {!textVisible && (
            <TouchableOpacity onPress={clicarbotao}>
              <MaterialIcons style={styles.iconadd} name="add-task" size={35} color="black" />
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView>
          <View style={styles.body}>
            <View>
              <>
                {exibirView && (
                  <View style={styles.backexe}>
                    
                    <FlatList
                      keyExtractor={(item) => item.key}
                      data={texemplo}
                      renderItem={({item}) => (
                        <Text style={styles.texto}>{item.tex}</Text>

                      )}
                    />
                    <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => removerView()}> 
                      <MaterialIcons style={{marginLeft: 'auto'}} name="delete-outline" size={40} color="black" />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            </View>
                  
              {textVisible && (
                <View style={styles.task}>
                    <TextInput multiline style={styles.texinp} value={inputText} onChangeText={setInputText} />
                    <View style={styles.bot}>
                      <Button  title="Save" 
                      color="#FF7BDA" 
                      onPress={savebotao} />
                    </View>
                                                                                                    
                </View>
                
              )}
              {
              lista.map(
                        (item, index) =>  {
                          return (
                            <View style={styles.listagem}>
                              <Text style={styles.texto2} key={index}>{item}</Text>
                              <TouchableOpacity style={styles.iconnote} onPress={() => removerItem(index)}> 
                                <MaterialCommunityIcons  name="note-check" size={35} color="black" />
                              </TouchableOpacity>
                            </View>
                          )
                        })
              } 
                
            </View>
          <StatusBar style="auto" /> 
        </ScrollView>       
      </View>    
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  head: {
    backgroundColor: '#CDB6FA',
    flexDirection: 'row',
    width: screenWidth,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',

    //marginLeft: 10,
    //marginRight: 10,
  },
  texhead: {
    flex: 1,
    fontWeight: '600',
    fontSize: 30,
    marginLeft: 10,

  },
  iconadd: {
      marginRight: 10,
  },
  body: {
    backgroundColor: '#E1D6F6',
    width: screenWidth,
    height: screenHeight,

    paddingTop: 15,
    paddingRight: 10,
    paddingLeft: 10,


  },
  backexe: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FDFD96',
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    marginBottom: 10,
  },
  texto: {
    color: 'gray',
    paddingRight: 45,
  },
  task: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FDFD96',
    marginTop: 15,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  texinp: {
    paddingRight: 85,
  },
  bot: {
    marginLeft: 'auto',
    width:80,
    height: 36,
    marginTop: 'auto',
    
  },
  listagem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFD96',
    marginTop: 10,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    
  },
  iconnote:{
    marginLeft: 'auto',
    alignItems: 'center',
  },
  texto2:{
    paddingRight: 45,
  },
});
