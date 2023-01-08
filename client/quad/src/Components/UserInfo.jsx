import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react'
  import { FaUserCircle } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { userLogout } from '../Redux/Reducers/UserAuthReducer/action'

const UserInfo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef() 
    const dispatch = useDispatch();
    const logoutToast = useToast();

    const handleLogout = () =>{
          dispatch(userLogout())
                logoutToast({
                    title : "Logout successfully",
                    status : "success",
                    isClosable : true,
                    duration : 1500,
                    position : "top"
                })
    }


  return (
    <>
      <Button ref={btnRef} variant={"unstyled"} onClick={onOpen} size={"md"}>
        <FaUserCircle size={"35px"}/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Button onClick={handleLogout}>Logout</Button>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UserInfo