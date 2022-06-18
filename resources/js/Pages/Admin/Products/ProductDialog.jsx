import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormHelperText,
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
import {usePage} from "@inertiajs/inertia-react";

export default function ProductDialog(
    {
        product, open, onClose, onSubmit, submitText, title, children
    }
) {
    const [form, setForm] = useState(product ?? {});

    useEffect(() => {
        setForm(product ?? {});
    }, [product])

    const {errors} = usePage().props;

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

    const clearValidationErrors = () => {
        for (let key in errors) {
            delete errors[key];
        }
    }

    return (
        <Dialog
            scroll="paper"
            fullScreen={fullScreen}
            open={open}
            onClose={() => {
                clearValidationErrors();
                onClose();
            }}
        >
            <DialogTitle>
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
                        error={!!errors['title']}
                        helperText={errors['title']}
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
                        error={!!errors['description']}
                        helperText={errors['description']}
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
                            error={!!errors['type']}
                            helperText={errors['type']}
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
                        error={!!errors['price']}
                        helperText={errors['price']}
                    />

                    <input accept="image/*" id="image" type="file" style={{display: "none"}}
                           onChange={createSetInput('image')}/>
                    <label htmlFor="image">
                        <Button variant="contained" component="span" color={!!errors['image'] ? 'error' : 'primary'}>
                            Upload Image {form.image && form.image.name}
                        </Button>
                        {
                            !!errors['image'] ? (
                                <FormHelperText error>{errors['image']}</FormHelperText>
                            ) : null
                        }
                    </label>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => {
                    clearValidationErrors();
                    onClose();
                }}>
                    Cancel
                </Button>
                <Button onClick={() => onSubmit(form)}>
                    {submitText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
