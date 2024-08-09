'use client';
import { useState, useEffect } from "react";
import { firestore } from '@/firebase';
import { Box, Button, Modal, Stack, TextField, Typography, IconButton} from "@mui/material";
import { Add, Edit, Delete } from '@mui/icons-material';
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import CameraComponent from './webcammodule/CameraComponent';
import PrimarySearchAppBar from "./Theme/Nav";
import RecipePage from "./Theme/Recipe";
import LandingPage from "./Theme/Landingpage";
import ResponsiveAlert from "./Theme/ResponsiveAlert";


export default function Home() {  
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [addItemOption, setAddItemOption] = useState('');
  const [recipeview, setRecipeView] = useState(false);
  const [showinventoryview,setShowInventoryView]=useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  // const [openAddItemModal, setOpenAddItemModal] = useState(false);
  // const [addSelectedItemOption, setAddSelectedItemOption] = useState('');

  // const handleOpenAddItemModal = () => {
  //   setItemName('');
  //   setItemQuantity(1);
  //   setOpenAddItemModal(true);
  // }
  // const handleCloseAddItemModal = () => {
  //   setOpenAddItemModal(false);
  //   setEditingItem(null);
  //   setNewQuantity(0);
  //   setAddItemOption('');
  // }
 
  // const handleAddItemOptionChange = (option) => {
  //   setAddSelectedItemOption(option);
  //   console.log(addSelectedItemOption)
  //   handleOpenAddItemModal(); // Open the modal when an option is selected
  // };


  // const  handleItemAddedInMOdal = () => {
  //   setAddSelectedItemOption(''); // Close the add item image section
  // }
  // const renderAddItemSection = () => {
  //   if (addSelectedItemOption === 'text') {
  //     return (
  //       <Stack direction="column" spacing={2}>
  //         <TextField
  //           label="Item Name"
  //           value={itemName}
  //           onChange={(e) => setItemName(e.target.value)}
  //         />
  //         <TextField
  //           label="Quantity"
  //           type="number"
  //           value={itemQuantity}
  //           onChange={(e) => setItemQuantity(Number(e.target.value))}
  //         />
  //         <Button variant="contained" onClick={() => {
  //           addNewAndExistingItem(itemName,itemQuantity);
  //           setOpenAddItemModal(false)
  //         }}>Add Item</Button>
  //       </Stack>
  //     );
  //   } else if (addSelectedItemOption === 'image') {
  //     return (
  //       <Box>
  //         <CameraComponent updateInventory={updateInventory} addItem={addItem} onItemAdded={handleItemAddedInMOdal}/>
  //       </Box>
  //     );
  //   }
  //   return null;
  // };

  
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  }

  useEffect(() => {
    updateInventory();
  }, []);



  const handleItemAdded = () => {
    setOpen(false); // Close the add item image section
    setAlertOpen("true")
    setAddItemOption(''); 
   
  }

  const showRecipeView=()=>{
    setShowInventoryView(false)
    setRecipeView(true)
  }
  const  closeRecipeView=()=>{
    setRecipeView(false)
    setShowInventoryView(true)
   
  }
 

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  }
  
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  }

  const editItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    await setDoc(docRef, { quantity });
    await updateInventory();
  }
  
  const addNewAndExistingItem = async (item, newQuantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + newQuantity });
    } else {
      await setDoc(docRef, { quantity: newQuantity });
    }

    await updateInventory();
    setAlertOpen("true")
  }

  const handleOpen = () => {
    setItemName('');
    setItemQuantity(1);
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
    setAddItemOption('');
  }

  const handleEditSubmit = async () => {
    if (editingItem && newQuantity > 0) {
      await editItem(editingItem, newQuantity);
      setEditingItem(null);
      setNewQuantity(0);
    }
  }

  const handleAddItemOptionChange = (option) => {
    if (option !== '' && option != null) {
      setAddItemOption(option);
      handleOpen(); // Open the modal when an option is selected
    }
  };
  const renderAddItemSection = () => {
    if (addItemOption === 'text') {
      return (
        <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        bgcolor="white" 
        width={400} 
        borderRadius={2}
        boxShadow={3}
        p={4} 
        display="flex" 
        flexDirection="column" 
        gap={3} 
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Typography variant="h6">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField 
            variant="outlined" 
            fullWidth 
            label="Item Name"
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
          />
        </Stack>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField 
            variant="outlined" 
            fullWidth 
            type="number" 
            label="Quantity" 
            value={itemQuantity} 
            onChange={(e) => setItemQuantity(Number(e.target.value))} 
          />
          <Button 
            variant="contained" 
            onClick={() => {
              addNewAndExistingItem(itemName, itemQuantity);
              setItemName('');
              setItemQuantity(1);
              handleClose();
            }}
            sx={{ bgcolor: "#1976d2", color: "white" }}
          >
            Add
          </Button>
        </Stack>
      </Box>
      );
    } else if (addItemOption === 'image') {
      return (
       
       
        <div style={{ marginTop: '20px', width: '100%' }}>
           <Typography variant="h6">Add Item by Image</Typography>
        <CameraComponent updateInventory={updateInventory} addItem={addItem} onItemAdded={handleItemAdded} />

        </div>
      );
    }
    return null;
  };

  return (
    <>
    
    <PrimarySearchAppBar sx={{ width: '100vw', mb: 2 }} closeRecipeView={closeRecipeView} showRecipeView={showRecipeView} inventory={inventory} setSelectedItem={setSelectedItem} onAddItemOptionChange={handleAddItemOptionChange} />
   {recipeview && (<RecipePage inventory={inventory} />)}
   {showinventoryview && (<Box  
      width="100vw" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      flexDirection="column" 
      gap={2}
      bgcolor="#3C3C3C"
      padding={3}
      // sx={{ overflowY: 'auto' }} // Make the whole page scrollabley
    >
    
   <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          {renderAddItemSection()}
        </Box>
      </Modal>

      {/* <Modal open={open} onClose={handleClose}>
        <Box 
          position="absolute" 
          top="50%" 
          left="50%" 
          bgcolor="white" 
          width={400} 
          borderRadius={2}
          boxShadow={3}
          p={4} 
          display="flex" 
          flexDirection="column" 
          gap={3} 
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined" 
              fullWidth 
              label="Item Name"
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)} 
            />
          </Stack>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined" 
              fullWidth 
              type="number" 
              label="Quantity" 
              value={itemQuantity} 
              onChange={(e) => setItemQuantity(Number(e.target.value))} 
            />
            <Button 
              variant="contained" 
              onClick={() => {
                addNewAndExistingItem(itemName, itemQuantity);
                setItemName('');
                setItemQuantity(1);
                handleClose();
              }}
              sx={{ bgcolor: "#1976d2", color: "white" }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal> */}

      <Box 
        width="100%"
        maxWidth={800} // Adjust the max width for better alignment
        sx={{ overflowY: 'auto', flexGrow: 1 }} // Allow the main container to grow and be scrollable
      >
        {/* <Typography variant="h4" gutterBottom>
          Pantry Tracker
        </Typography> */}

        {/* Search Bar */}
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={inventory.map((item) => ({ label: item.name, quantity: item.quantity }))}
          sx={{ width: '100%', mb: 2 }}
          onChange={(event, newValue) => setSelectedItem(newValue ? newValue.label : null)}
          renderInput={(params) => <TextField {...params} label="Search Inventory" variant="outlined" />}
        /> */}

        {/* Dropdown for Add Item Options */}
        {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="add-item-options-label">Add Item Options</InputLabel>
          <Select
            labelId="add-item-options-label"
            id="add-item-options"
            value={addItemOption}
            onChange={(e) => setAddItemOption(e.target.value)}
            label="Add Item Options"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="text">Add Item by Text</MenuItem>
            <MenuItem value="image">Add Item by Image</MenuItem>
          </Select>
        </FormControl> */}
{/* 
        {addItemOption === 'text' && (
          <Paper 
            elevation={3} 
            sx={{ 
              padding: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography variant="h6">Add Item by Text</Typography>
            <Button 
              variant="contained" 
              onClick={handleOpen} 
              sx={{ bgcolor: "#1976d2", color: "white", mt: 2 }}
            >
              Add New Item
            </Button>
          </Paper>
        )}

        {addItemOption === 'image' && (
          <Paper 
            elevation={3} 
            sx={{ 
              padding: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography variant="h6">Add Item by Image</Typography>
            <div style={{ marginTop: '20px', width: '100%' }}>
            <CameraComponent updateInventory={updateInventory} addItem={addItem} onItemAdded={handleItemAdded} />

            </div>
          </Paper>
        )} */}

        {/* Inventory List */}
        <Box 
          border="1px solid #333" 
          borderRadius={2} 
          p={3} 
          bgcolor="white" 
          boxShadow={3} 
          sx={{ maxHeight: '400px', overflowY: 'auto' }} // Set a fixed height with scrollable content
        >
          {/* <Typography variant="h5" sx={{ 
    background: 'linear-gradient(135deg, #FFD700, #FFA500)', 
  }} gutterBottom>
            {selectedItem ? `${selectedItem}` : "All Pantry Items"}
          </Typography> */}
          
          <Stack width="100%" spacing={2}>
  {(selectedItem ? inventory.filter(item => item.name === selectedItem) : inventory).map(({ name, quantity, image }) => (
    <Box
      key={name}
      width="100%"
      minHeight="120px"
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }} // Stack items vertically on small screens
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#fff"
      borderRadius={3}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      padding={2}
    >
        <ResponsiveAlert
        open={alertOpen}
        setAlertOpen={setAlertOpen}
        message="Item added successfully!"
      />
      <Box display="flex" alignItems="center" width={{ xs: '100%', sm: '30%' }}>
        {/* <img
          src={image} // Assuming your inventory items have an image property
          alt={name}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginRight: '16px',
          }}
        /> */}
        <Typography variant="h6" color="#333" textAlign="left" fontWeight="bold">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems={{ xs: 'flex-start', sm: 'center' }} width={{ xs: '100%', sm: '20%' }} mt={{ xs: 2, sm: 0 }}>
        {editingItem === name ? (
          <TextField
            variant="outlined"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
            }}
            autoFocus
          />
        ) : (
          <Typography variant="body1" color="#666" textAlign="center">
            Quantity: {quantity}
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1} width={{ xs: '100%', sm: '20%' }} mt={{ xs: 2, sm: 0 }}>
        <IconButton color="primary" onClick={() => addItem(name)}>
          <Add />
        </IconButton>
        <IconButton color="secondary" onClick={() => setEditingItem(name)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => removeItem(name)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  ))}
</Stack>

        </Box>
      </Box>
    </Box>)}

    {!recipeview && !showinventoryview&& (
              <LandingPage 
              />
            )}
    </>
    
  );
}
