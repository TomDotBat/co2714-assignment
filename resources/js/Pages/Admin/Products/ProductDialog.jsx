import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    Stack,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";

export default function ProductDialog(
    {
        product, open, onCancel, onClose, onSubmit, submitText, title, children
    }
) {
    const [form, setForm] = useState(product ?? {});

    useEffect(() => {
        setForm(product ?? {});
    }, [product])

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const createSetInput = (inputName) => {
        return (value) => {
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
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent>
                {children}

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
                        value={form.title ?? ''}
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
                        value={form.description ?? ''}
                        onChange={createSetInput('description')}
                    />

                    <FormControl
                        variant="standard"
                    >
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                            name="type"
                            id="type"
                            value={form.type ?? ''}
                            defaultValue=""
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
                        value={form.price ?? ''}
                        onChange={createSetInput('price')}
                    />


                    <input accept="image/*" id="image" type="file" style={{display: "none"}}
                           onChange={createSetInput('image')}/>
                    <label htmlFor="image">
                        <Button variant="contained" component="span">
                            Upload Image {form.image && form.image.name}
                        </Button>
                    </label>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={() => onSubmit(form)}>
                    {submitText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
