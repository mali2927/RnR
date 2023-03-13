import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { date } from "yup";
import config from "../config";

const Showdata = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.baseURL}/unitsInforamtion`);
      const json = await response.json();
      setData(json.data);
      // console.log(json.data);
    };

    fetchData();
  }, []);
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({ ...data[index] });
  };

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete unit Information?"
    );
    if (!confirmDelete) {
      return;
    }
    fetch(`${config.baseURL}/unit/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(({ message }) => {
        setData(data.filter((item) => item.unit_info_id !== id));
        setResponseMessage(message);
      });
  }

  const handleSave = async () => {
    const newData = [...data];
    newData[editingIndex] = editedData;
    // console.log(editedData);
    //console.log(editingIndex);

    try {
      const id = editedData["unit_info_id"];

      const response = await fetch(`${config.baseURL}/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newData = await response.json();
      setData((prevData) => {
        const index = prevData.findIndex((row) => row.id === editingIndex);
        const updatedData = [...prevData];
        updatedData[index] = newData;
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
    setData(newData);
    setEditingIndex(null);
    setEditedData(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedData(null);
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedTimestamp = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedTimestamp;
  }
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearch = async () => {
    const response = await fetch(
      `${config.baseURL}/search?query=${searchText}`
    );
    const data = await response.json();
    setData(data);
  };
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        value,
      ]);
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== value)
      );
    }
  };
  const options = [
    { value: "adm_2587", label: "ADM 2587" },
    { value: "battery_faulty", label: "Battery Faulty" },
    { value: "battery_swolen", label: "Battery Swollen" },
    { value: "fans_faulty", label: "Fans Faulty" },
    { value: "fans_broken", label: "Fans Broken" },
    { value: "power_switch_broken", label: "Power Switch Broken" },
    { value: "lm_2576_pwrsply", label: "LM2576 (5v) Power Supply" },
    { value: "narada_485_comm", label: "Narada & RS485 Communication" },
    { value: "narada_485_faulty", label: "Narada & RS485 Faulty" },
    { value: "nano_faulty", label: "Nano Faulty" },
    { value: "nradaportethburn", label: "Narada Port Ethernet Burn" },
    { value: "coil_damange_471", label: "471 Coil Damage" },
    {
      value: "pwr_supply_wrong_polrity",
      label: "Power supply Wrong Polarity Input Issue",
    },
    { value: "water_damage", label: "Water Damage" },
    { value: "sim_slot_faulty", label: "Sim Slots Faulty" },
    { value: "sim_jacket_broken", label: "Sim Jackets Broken" },
    { value: "tpmm_port_faulty", label: "TPMM Port Faulty" },
    { value: "tpmm_alaram_card_faulty", label: "TPMM Alarm Card Faulty" },
    { value: "tpmm_faulty", label: "TPMM Faulty" },
    {
      value: "internal_serial_ports_faulty",
      label: "Internal Serial Ports Faulty",
    },
    {
      value: "wire_burn_due_to_button_short",
      label: "Wire Burned Due To Button Short",
    },
    { value: "pwr_sply_faulty", label: "Power Supply Faulty" },
    { value: "pwr_sply_burn", label: "Power Supply Burn" },
    { value: "no_power", label: "No Power" },
    { value: "modem_ports", label: "Modem Ports" },
    { value: "no_fault", label: "No Fault" },
    { value: "coil_damage-broken_471", label: "471 Coil Broken/Damaged" },
    { value: "tantalum_short10uf", label: "10uF 25v tantalum short" },
    { value: "ber_unrepairable", label: "BER / Unrepairable" },
    { value: "ber_repairable", label: "BER / Repaireable" },
  ];
  const half = Math.ceil(options.length / 2);
  const leftoptions = options.slice(0, half);
  const rightoptions = options.slice(-half);
  return (
    <>
      {/* <ul>
        {data.map((item) => (
          <li key={item.unit_info_id}>{item.unitNumber}</li>
        ))}
      </ul> */}
      <div>
        {responseMessage && <p>{responseMessage}</p>}
        <div className="input-group">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-primary"
          >
            search
          </button>
        </div>
        <br></br>
      </div>
      <table className="table table-dark table-sm table-bordered">
        <thead>
          <tr
            style={{
              fontSize: "16px",
            }}
          >
            <th>#</th>
            <th>Unit Number</th>
            <th>Receive data</th>
            <th>initial Fault</th>
            <th>Deleiver Date</th>
            <th>More Fault</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {/* {(item.updated_at = item.updated_at.toLocaleString())} */}
              <tr
                style={{
                  fontSize: "15px",
                }}
              >
                <td>{index + 1}</td>
                <td>{item.unitNumber}</td>
                <td>{item.receiveDate}</td>
                <td>{item.initialFault}</td>
                <td>{item.deliverDate}</td>
                <td>{item.moreFaults}</td>
                <td>{formatTimestamp(item.updated_at)}</td>

                <td>
                  <button
                    style={{
                      width: "70px",
                      height: "30px",
                      fontSize: "14px",
                    }}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      width: "70px",
                      height: "30px",
                      fontSize: "14px",
                    }}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.unit_info_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <div style={{ width: "30%", height: "30%", overflow: "auto" }}>
                {editingIndex === index && (
                  <tr
                    className="position-fixed mx-auto"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 999,
                    }}
                  >
                    <td>
                      <input
                        type="text"
                        value={editedData.unitNumber}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            unitNumber: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editedData.receiveDate}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            receiveDate: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editedData.initialFault}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            initialFault: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editedData.deliverDate}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            deliverDate: e.target.value,
                          })
                        }
                      />
                    </td>

                    <div className="row">
                      <div className="col">
                        {" "}
                        {leftoptions.map((option) => (
                          <div key={option.value}>
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={selectedOptions.includes(option.value)}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              style={{
                                fontSize: "20px",
                              }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                        <td>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => handleSave()}
                          >
                            Save
                          </button>
                        </td>
                      </div>
                      <div className="col">
                        {" "}
                        {rightoptions.map((option) => (
                          <div key={option.value}>
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={selectedOptions.includes(option.value)}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              style={{
                                fontSize: "20px",
                              }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                        <td>
                          <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </td>
                      </div>
                    </div>
                  </tr>
                )}
              </div>
            </React.Fragment>
          ))}
        </tbody>
        <br></br>
        <tfoot className="table-footer">
          <tr
            style={{
              fontSize: "15px",
            }}
          >
            <td colSpan="2">Total Records: {data.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Showdata;
