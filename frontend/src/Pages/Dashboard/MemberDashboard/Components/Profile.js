import React, { useState } from "react";

export const Profile = ({ memberDetails }) => {
  return (
    <div className="dashboard-option-content" style={{width:'100%'}}>
      <div className="member-profile-content" id="profile@member">
        <div className="user-details-topbar">
          <img
            className="user-profileimage"
            src="https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            alt=""
          ></img>
          <div className="user-info">
            <p className="user-name">{memberDetails?.userFullName}</p>
            <p className="user-email">{memberDetails?.email}</p>
          </div>
        </div>
      </div>

      <div className="member-activebooks-content" id="activebooks@member">
        <p className="member-dashboard-heading">Issued</p>
        <table className="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Fine</th>
          </tr>
          {memberDetails?.activeTransactions
            ?.filter((data) => {
              return data.transactionType === "Issued";
            })
            .map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.bookName}</td>
                  <td>{data.fromDate}</td>
                  <td>{data.toDate}</td>
                  <td>{""}</td>
                </tr>
              );
            })}
        </table>
      </div>

      <div className="member-reservedbooks-content" id="reservedbooks@member">
        <p className="member-dashboard-heading">Reserved</p>
        <table className="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From</th>
            <th>To</th>
          </tr>
          {memberDetails?.activeTransactions
            ?.filter((data) => {
              return data.transactionType === "Reserved";
            })
            .map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.bookName}</td>
                  <td>{data.fromDate}</td>
                  <td>{data.toDate}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <div className="member-history-content" id="history@member">
        <p className="member-dashboard-heading">History</p>
        <table className="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From</th>
            <th>To</th>
            <th>Return Date</th>
          </tr>
          {memberDetails?.prevTransactions?.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.bookName}</td>
                <td>{data.fromDate}</td>
                <td>{data.toDate}</td>
                <td>{data.returnDate}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
