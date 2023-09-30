import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import './MyDatePicker.scss';

function MyDatePicker({ value, onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                slotProps={{
                    actionBar: {
                        actions: ['today'],
                    },
                    textField: { size: 'small' },
                }}
                value={value}
                onChange={onChange}
                format="MMM D"
                className="custom-mobile-datepicker"
            />
        </LocalizationProvider>
    );
}

export default MyDatePicker;
