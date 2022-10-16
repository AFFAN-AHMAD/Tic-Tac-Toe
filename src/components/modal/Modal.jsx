import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
 FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
} from '@chakra-ui/react'
import styles from "./Modal.module.css"
function BasicUsage({isOpen,onOpen,setOpen}) {
  const [player1,setPlayer1] =useState("")
  const [player2,setPlayer2] =useState("")
  const handleClose = ()=>{
    setOpen(false)
  }
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={onOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent style={{textAlign:"center",alignContent:"center"}}>
          <ModalHeader fontWeight={"700"} fontSize={"25px"}>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
            {/* player 1 name */}
            <Flex className={styles.inputContainer}>
            <label style={{fontWeight:"bold"}}>Player 1</label>
            <Input placeholder='player1' onChange={(e)=>{console.log(e.currentTarget.value)}} w="50%"/>
            </Flex>
            {/* player 2 name */}
             <Flex className={styles.inputContainer}>
            <label  style={{fontWeight:"bold"}}>Player 2</label>
            <Input placeholder='player2' onChange={(e)=>{console.log(e.currentTarget.value)}} w="50%"/>
            </Flex>
            {/* time limit */}
             <Flex className={styles.inputContainer}>
            <label  style={{fontWeight:"bold"}}>Time limit per move(sec) </label>
            <Input placeholder='limit' onChange={(e)=>{console.log(e.currentTarget.value)}} w="20%" />
            </Flex>
          </FormControl>
          </ModalBody>

          <ModalFooter >
            <Button colorScheme='blue' mr={3} onClick={()=>handleClose()} style={{margin:"auto"}}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BasicUsage 