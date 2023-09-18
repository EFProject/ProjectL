import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function FilterNews({ onFilterChange }) {
    const [filter, setFilter] = useState({
        country: 'it', //default language it
        q: '',
        pageSize: 10,
        page: 1,
    });

    const countryOptions = [
        'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg',
        'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma',
        'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg',
        'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'pageSize' && parseInt(value) <= 0) {
            return;
        }
        setFilter({ ...filter, [name]: value });
    };

    const handleApplyFilter = () => {
        onFilterChange(filter);
    };

    return (
        <Container className="mt-4">
            <h3>News Filter</h3>
            <Row>
                <Col xs={12} sm={12} md={2}>
                    <Form.Group>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            as="select"
                            id="country"
                            name="country"
                            value={filter.country}
                            onChange={handleChange}
                        >
                            <option value="">Select Country</option>
                            {countryOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option.toUpperCase()}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={3}>
                    <Form.Group>
                        <Form.Label>Keywords:</Form.Label>
                        <Form.Control
                            type="text"
                            id="q"
                            name="q"
                            value={filter.q}
                            onChange={handleChange}
                            placeholder="Enter keywords"
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={2}>
                    <Form.Group>
                        <Form.Label>Page Size:</Form.Label>
                        <Form.Control
                            type="number"
                            id="pageSize"
                            name="pageSize"
                            value={filter.pageSize}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={3}>
                    <Form.Group>
                        <Button
                            className='form-button filter-button'
                            type="button"
                            onClick={handleApplyFilter}
                        >
                            Apply Filter
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
}

export default FilterNews;
