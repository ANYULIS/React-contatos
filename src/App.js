import React from 'react';
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
import{Box,Flex,Button,useDisclosure,Table,Thead,Tr,Th,Tbody,Td,useBreakpointValue} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ModalComp from './components/ModalComp';
import './App.css';

const App = () => {
  const{isOpen,onOpen,onClose} =useDisclosure();
  const [data,setData]= useState([]);
  const [dataEdit,setDataEdit]=useState({});

  const isMobile= useBreakpointValue({
    base:true,
    lg:false,
  });

  useEffect(() => {
  const db_costumer =localStorage.getItem("cad_cliente")
  ? JSON.parse(localStorage.getItem("cad_cliente"))
  :[];
  setData(db_costumer);
 }, [setData]);

  const handleRemove= (email) =>{
    const newDataArray = data.filter((item)=> item.email !== email); 
    setData(newDataArray);
    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
  };
  
  return (
   <Flex  h="100vh"
   align="center"
   justify="center"
   fontFamily="poppins"
   fontSize="20px"
   className="modal1">
   <Box maxW={500} w="500px" h="100vh" py={10} px={2}>
    <Button colorScheme="blue" onClick={()=>[setDataEdit({}), onOpen()]}>Novo Cadastro</Button>
    <Box overflow="auto" height="100%">
     <Table mt="6">
     <Thead>
      <Tr>
        <Th maxW={isMobile ? 5:100} fontSize="20px">
         Nome
        </Th>
        <Th maxW={isMobile ? 5:100} fontSize="20px">
         Email
        </Th>
        <Th maxW={isMobile ? 5:100} fontSize="20px">
         Telefone
        </Th>
        <Th p={0}></Th>
        <Th p={0}></Th>
      
      </Tr>
     </Thead>
     <Tbody>
      {data.map(({name,email,telefono},index) =>(
        <Tr key={index} cursor="pointer" _hover={{bg:"gray.100"}}>
          <Td maxW={isMobile ? 5: 100}>{name}</Td>
          <Td maxW={isMobile ? 5: 100}>{email}</Td>
          <Td maxW={isMobile ? 5: 100}>{telefono}</Td>
          <Td p={0}>
           <EditIcon
           fontSize={20}
           onClick={()=>[
            setDataEdit({name,email,telefono,index}),
            onOpen(),
          ]}
           />
          </Td>
          <Td p={0}>
            <DeleteIcon
            fontSize={20}
            onClick={() => handleRemove(email)}
            />
          </Td>

        </Tr>
      ))}
     </Tbody>
     </Table>

   </Box>
   </Box>

  { isOpen && (
  <ModalComp
  isOpen={isOpen}
  onClose={onClose}
  data={data}
  setData={setData}
  dataEdit={dataEdit}
  setDataEdit={setDataEdit}
  />
  )}
   </Flex>
  );
}

export default App;
