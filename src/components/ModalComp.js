import React from "react";
import { useState } from "react";
import{Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,Button,FormControl,FormLabel,Input,Box, ModalFooter, background, border}from "@chakra-ui/react"




const ModalComp = ({data,setData,dataEdit,isOpen,onClose})=>{
   const[name,setName]= useState(dataEdit.name || ""); 
   const[email,setEmail]= useState(dataEdit.email|| ""); 
   const[telefono,setTelefono]= useState(dataEdit.telefono || ""); 

   const handleSave=()=>{
      if(!name || ! email || !telefono) return;
      if(emailAlreadyExists()){
         return alert ("email ja cadastrado!");
      }
      if(Object.keys(dataEdit).length){
         data[dataEdit.index]= {name,email,telefono};
      }
      const newDataArray= !Object.keys(dataEdit).length
      ?[...(data? data:[]), {name,email,telefono}]
      :[...(data? data:[])]

      localStorage.setItem("cad_cliente",JSON.stringify(newDataArray));

      setData(newDataArray);
      onclose();
   };
   const emailAlreadyExists= ()=>{
      if(dataEdit.email !==email && data?.length){
         return data.find((item)=> item.email === email);
      }
      return false;
   };
    
    return(
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
     <ModalOverlay/>
     <ModalContent>
        <ModalHeader>Cadastrar Contato</ModalHeader>
        <ModalCloseButton/>
     <ModalBody>
        <FormControl display="flex" flexDir="column" gap={4}  className="modal">
         <Box>
            <FormLabel>Nome</FormLabel>
            <Input
             type="text"
             value={name}
             onChange={(e)=> setName(e.target.value)}/>
         </Box>
         <Box>
            <FormLabel>Email</FormLabel>
            <Input
             type="email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}/>
         </Box>
         <Box>
            <FormLabel>Telefone</FormLabel>
            <Input
             type="text"
             value={telefono}
             onChange={(e)=> setTelefono(e.target.value)}/>
         </Box>
        </FormControl>
     </ModalBody>
     <ModalFooter justifyContent="start">
      <Button colorScheme="green" mr={3} onClick={handleSave}>Salvar</Button>
      <Button colorScheme="red" mr={3} onClick={onClose}>Cancelar</Button>
     </ModalFooter>
     </ModalContent>
     
    </Modal>
    </>
    );
};
export default ModalComp;