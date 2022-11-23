import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Button,
    Input,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

const LocationSearch = () => { 

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

  return (
    <>
       <Button ref={btnRef} variant={"link"} fontSize={{base:"10px", sm:"11px", md:"15px"}} fontWeight={"500"} onClick={onOpen}>
          Kota, Rajasthan, India
       </Button> 
       <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
           
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
            
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default LocationSearch