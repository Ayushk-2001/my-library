import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard.css";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { Dropdown } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function AddTransaction() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [bookId, setBookId] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [borrowerDetails, setBorrowerDetails] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateString, setFromDateString] = useState(moment(new Date()).format("MM/DD/YYYY"));
  const borrowerId = user._id;
  
  const calculateToDate = (duration_time) => {
    const today = new Date();
    // Define mapping for duration strings to month increments
    const durationMap = {
      "6_MONTHS": 6,
      "1_YEAR": 12,
      "2_YEAR": 24,
    };

    // Check if duration is valid
    if (!durationMap.hasOwnProperty(duration_time)) {
      throw new Error(
        "Invalid duration provided. Valid options are: 6_MONTHS, 1_YEAR, 2_YEAR"
      );
    }
    const monthsToAdd = durationMap[duration_time];
    // Add months to the date object and return
    today.setMonth(today.getMonth() + monthsToAdd);
    return today;
  };
 

  const [toDate, setToDate] = useState(calculateToDate('6_MONTHS'));
  const [toDateString, setToDateString] = useState(moment(calculateToDate('6_MONTHS')).format("MM/DD/YYYY"));

  const [transactionType, setTransactionType] = useState("Issued");
  const [duration, setDuration] = useState("6_MONTHS");

  const durationOptions = [
    { value: "6_MONTHS", text: "6 Months" },
    { value: "1_YEAR", text: "1 Year" },
    { value: "2_YEAR", text: "2 Years" },
  ];
  /* Adding a Transaction */
  const addTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      bookId !== "" &&
      transactionType !== "" &&
      fromDate !== null &&
      toDate !== null
    ) {
      const borrower_details = await axios.get(
        API_URL + "api/users/getuser/" + borrowerId
      );
      const book_details = await axios.get(
        API_URL + "api/books/getbook/" + bookId
      );

      /* Checking weather the book is available or not */
      if (
        (book_details.data.bookCountAvailable > 0 &&
          (transactionType === "Issued" || transactionType === "Reserved")) ||
        (book_details.data.bookCountAvailable === 0 &&
          transactionType === "Reserved")
      ) {
        const transactionData = {
          bookId: bookId,
          borrowerId: borrowerId,
          borrowerName: borrower_details.data.userFullName,
          bookName: book_details.data.bookName,
          transactionType: transactionType,
          fromDate: fromDateString,
          toDate: toDateString,
          isAdmin: user.isAdmin,
        };
        try {
          const response = await axios.post(
            API_URL + "api/transactions/add-transaction",
            transactionData
          );
          if (recentTransactions.length >= 5) {
            recentTransactions.splice(-1);
          }
          await axios.put(
            API_URL +
              `api/users/${response.data._id}/move-to-activetransactions`,
            {
              userId: borrowerId,
              isAdmin: user.isAdmin,
            }
          );

          await axios.put(API_URL + "api/books/updatebook/" + bookId, {
            isAdmin: user.isAdmin,
            bookCountAvailable: book_details.data.bookCountAvailable - 1,
          });

          setRecentTransactions([response.data, ...recentTransactions]);
          setBookId("");
          setTransactionType("");
          setFromDate(null);
          setToDate(null);
          setFromDateString(null);
          setToDateString(null);
          alert("Transaction was Successfull 🎉");
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("The book is not available");
      }
    } else {
      alert("Fields must not be empty");
    }
    setIsLoading(false);
  };

   /* Fetch Transactions */
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/transactions/all-transactions"
        );
        setRecentTransactions(response.data.slice(0, 5));
      } catch (err) {
        console.log("Error in fetching transactions");
      }
    };
    getTransactions();
  }, [API_URL]);

  /* Fetching borrower details */
  useEffect(() => {
    const getBorrowerDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + borrowerId
        );
        setBorrowerDetails(response.data);
      } catch (err) {
        console.log("Error in getting borrower details");
      }
    };
    getBorrowerDetails();
  }, [API_URL]);

  /* Fetching books */
  useEffect(() => {
    const getallBooks = async () => {
      const response = await axios.get(API_URL + "api/books/allbooks");
      const allbooks = await response.data.map((book) => ({
        value: `${book._id}`,
        text: `${book.bookName}`,
      }));
      setAllBooks(allbooks);
    };
    getallBooks();
  }, [API_URL]);

  return (
    <div>
      <p className="dashboard-option-title">Add a Transaction</p>
      <div className="dashboard-title-line"></div>
      <form className="transaction-form" onSubmit={addTransaction}>
        <label className="transaction-form-label" htmlFor="bookName">
          Book Name<span className="required-field">*</span>
        </label>
        <br />
        <div className="semanticdropdown">
          <Dropdown
            placeholder="Select a Book"
            fluid
            search
            selection
            options={allBooks}
            value={bookId}
            onChange={(event, data) => setBookId(data.value)}
          />
        </div>
        {/* <p>Available Copies: {allBooks}</p> */}

        <label className="transaction-form-label" htmlFor="duration">
          Duration<span className="required-field">*</span>
        </label>
        <br />
        <div className="semanticdropdown">
          <Dropdown
            placeholder="Select Duration"
            fluid
            selection
            defaultValue="6_MONTHS"
            value={duration}
            options={durationOptions}
            onChange={(event, data) => {
              setDuration(data.value);
              const newDate = calculateToDate(data.value);
              setToDate(newDate);
              setToDateString(moment(newDate).format("MM/DD/YYYY"));
            }}
          />
        </div>
        <br />

        <label className="transaction-form-label" htmlFor="from-date">
          From Date<span className="required-field">*</span>
        </label>
        <br />
        <DatePicker
          className="date-picker"
          placeholderText="MM/DD/YYYY"
          selected={fromDate}
          onChange={(date) => {
            setFromDate(date);
            setFromDateString(moment(date).format("MM/DD/YYYY"));
          }}
          value={moment(new Date()).format("MM/DD/YYYY")}
          dateFormat="MM/dd/yyyy"
          disabled
        />

        <label className="transaction-form-label" htmlFor="to-date">
          To Date<span className="required-field">*</span>
        </label>
        <br />
        <DatePicker
          className="date-picker"
          placeholderText="MM/DD/YYYY"
          selected={toDate}
          onChange={(date) => {
            setToDate(date);
            setToDateString(moment(date).format("MM/DD/YYYY"));
          }}
          minDate={new Date()}
          value={moment(toDate).format("MM/DD/YYYY")}
          dateFormat="MM/dd/yyyy"
          disabled
        />

        <input
          className="transaction-form-submit"
          type="submit"
          value="SUBMIT"
          disabled={isLoading}
        ></input>
      </form>
      <p className="dashboard-option-title">Recent Transactions</p>
      <div className="dashboard-title-line"></div>
      <table className="admindashboard-table">
        <tr>
          <th>S.No</th>
          <th>Book Name</th>
          <th>Borrower Name</th>
          <th>Date</th>
        </tr>
        {recentTransactions.map((transaction, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.bookName}</td>
              <td>{transaction.borrowerName}</td>
              <td>{transaction.updatedAt.slice(0, 10)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default AddTransaction;
