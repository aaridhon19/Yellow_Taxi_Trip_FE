import React from 'react';
import Select from 'react-select';
import '../global.css';

const paymentOptions = [
    { value: 'CRD', label: 'Credit Card' },
    { value: 'CSH', label: 'Cash' },
    { value: 'NOC', label: 'No Charge' },
    { value: 'DIS', label: 'Dispute' },
    { value: 'UNK', label: 'Unknown' },
];

const FilterGroup = ({ label, children }) => (
    <div className="filter-group">
        <label>{label} :</label>
        {children}
    </div>
);

const Filter = ({ filters, setFilters }) => {
    const handleFilterChange = (field, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    };

    return (
        <div className="filter-container">
            <FilterGroup label="Payment Type">
                <Select
                    options={paymentOptions}
                    onChange={(selected) => handleFilterChange('paymentType', selected ? selected.value : '')}
                    placeholder="Select Payment Type"
                    className="select-dropdown"
                />
            </FilterGroup>

            <FilterGroup label="Pickup Time">
                <input
                    type="datetime-local"
                    value={filters.pickupTime || ''}
                    onChange={(e) => handleFilterChange('pickupTime', e.target.value)}
                    className="input-field"
                />
            </FilterGroup>

            <FilterGroup label="Dropoff Time">
                <input
                    type="datetime-local"
                    value={filters.dropoffTime || ''}
                    onChange={(e) => handleFilterChange('dropoffTime', e.target.value)}
                    className="input-field"
                />
            </FilterGroup>

            <FilterGroup label="Fare Range">
                <div className="range-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        min={0}
                        value={filters.fareRange[0] || ''}
                        onChange={(e) => handleFilterChange('fareRange', [e.target.value, filters.fareRange[1]])}
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        min={0}
                        value={filters.fareRange[1] || ''}
                        onChange={(e) => handleFilterChange('fareRange', [filters.fareRange[0], e.target.value])}
                        className="input-field"
                    />
                </div>
            </FilterGroup>

            <FilterGroup label="Distance Range">
                <div className="range-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        min={0}
                        value={filters.distanceRange[0] || ''}
                        onChange={(e) => handleFilterChange('distanceRange', [e.target.value, filters.distanceRange[1]])}
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        min={0}
                        value={filters.distanceRange[1] || ''}
                        onChange={(e) => handleFilterChange('distanceRange', [filters.distanceRange[0], e.target.value])}
                        className="input-field"
                    />
                </div>
            </FilterGroup>
        </div>
    );
};

export default Filter;
