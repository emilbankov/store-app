import "./Report.css";
import React, { useEffect, useState } from 'react';
import { report } from '../../services/reportService';
import { ReportItem, ReportResponse } from '../../interfaces';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { login } from '../../services/adminService';
import ErrorModal from '../Error Modal/ErrorModal';

const Report: React.FC = () => {
    const [inventoryData, setInventoryData] = useState<ReportItem[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchInventoryData = async (date: string) => {
        try {
            const reportData: ReportResponse = await report(date);
            setInventoryData(reportData.report);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    useEffect(() => {
        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        setSelectedDate(oneMonthAgo);
        fetchInventoryData(oneMonthAgo.toISOString().split('T')[0]);
    }, []);

    const handleDateChange = async (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            await fetchInventoryData(formattedDate);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ password });
            if (response) {
                setIsAuthenticated(true);
                setErrorMessage(null);
            }
        } catch (error) {
            setErrorMessage('Грешна парола. Моля, опитайте отново.');
            console.error('Login error:', error);
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="report-password-container">
                <form onSubmit={handlePasswordSubmit} className="report-password-form">
                    <label htmlFor="password">Въведете парола:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Парола"
                        className="report-password-input"
                    />
                    <button type="submit" className="report-password-button">Влез</button>
                </form>
                {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            </div>
        );
    }

    return (
        <div className="report-container">
            <div className="report-date-selector">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    id="report-date"
                    className="report-date-input"
                />
            </div>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Продукт</th>
                        <th>Снимка</th>
                        <th>Заредено <br /> количество</th>
                        <th>Продадено <br /> количество</th>
                        <th>Количество <br /> сега</th>
                        <th>Брак</th>
                        <th>Оборот</th>
                        <th>Дата на <br /> зареждане</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map(item => (
                        <tr key={item.product}>
                            <td>{item.product}</td>
                            <td><img src={item.image} alt={item.product} className="report-product-image" /></td>
                            <td>{item.quantityLoaded} {item.unit}</td>
                            <td>{item.quantitySold !== null ? `${item.quantitySold} ${item.unit}` : '0 кг.'}</td>
                            <td>{item.quantityNow} {item.unit}</td>
                            <td>{item.scrap !== null ? `${item.scrap} ${item.unit}` : '0 кг.'}</td>
                            <td>{item.total !== null ? `${item.total?.toFixed(2)} лв.` : '0 лв.'}</td>
                            <td>{item.loadedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
