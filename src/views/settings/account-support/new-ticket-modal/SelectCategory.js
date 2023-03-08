import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";

const SelectCategory = ({value, handleChange}) => {
    return (
        <FormControl margin='normal' variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
            <Select
                id="select-category"
                value={value}
                onChange={handleChange}
                label="Category"
                name='category'
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'test 1'}>Test 1</MenuItem>
                <MenuItem value={'test 2'}>Test 2</MenuItem>
                <MenuItem value={'test 3'}>Test 3</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectCategory;