import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, Input, InputLabel, Select, Stack, TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

export default function ProductDialog(props) {
    const [form, setForm] = useState({});

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const createSetInput = (inputName) => {
        return (value) => {
            console.log(value);

            if (value?.target) {
                if (value.target.type === 'file') {
                    if (value.target.files !== 0) {
                        value = value.target.files[0];
                    } else {
                        value = null;
                    }
                } else {
                    value = value.target.value;
                }
            }

            form[inputName] = value;
            setForm({...form});
        }
    };

    return (
        <Dialog
            scroll="paper"
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
                <Stack
                    component="form"
                    spacing={3}
                >
                    <TextField
                        autoFocus
                        required
                        variant="standard"
                        name="title"
                        type="text"
                        id="title"
                        autoComplete="title"
                        label="Title"
                        value={form.title}
                        onChange={createSetInput('title')}
                    />
                    <TextField
                        required
                        multiline
                        variant="standard"
                        name="description"
                        type="text"
                        id="description"
                        autoComplete="description"
                        label="Description"
                        value={form.description}
                        onChange={createSetInput('description')}
                    />
                    <FormControl
                        variant="standard"
                    >
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                            name="type"
                            id="type"
                            value={form.type}
                            onChange={createSetInput('type')}
                            sx={{
                                '& .MuiSelect-select': {
                                    backgroundColor: 'transparent !important',
                                }
                            }}
                        >
                            <MenuItem value="pizza">Pizza</MenuItem>
                            <MenuItem value="side">Side</MenuItem>
                            <MenuItem value="dessert">Dessert</MenuItem>
                            <MenuItem value="drink">Drink</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        variant="standard"
                        name="price"
                        id="price"
                        type="number"
                        label="Price"
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9.]*'
                        }}
                        value={form.price}
                        onChange={createSetInput('price')}
                    />
                    <label htmlFor="image">
                        <Input accept="image/*" id="image" multiple type="file" sx={{display: "none"}}
                               value={form.image} onChange={createSetInput('image')}/>
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button onClick={() => props.onSubmit(form)}>
                    {props.submitText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
