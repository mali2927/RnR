import React, { useState, useEffect } from "react";
import config from "../config";

const MultipeInput = () => {
  const [unitNumber, setUnitNumber] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [initialFault, setInitialFault] = useState("");
  const [deliverDate, setDeliverDate] = useState("");
  const [moreFaults, setMoreFaults] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [base64data, setBase64data] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (receiveDate > deliverDate) {
      console.error("Invalid date range");
      setError(
        "Invalid date Range! Recived Date must be earlier than Deliver Date"
      );
      return;
    }
    const data = {
      unitNumber,
      receiveDate,
      initialFault,
      deliverDate,
      imageUrl,
      moreFaults,
    };
    const response = await fetch(`${config.baseURL}/receivedata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);

    if (response.ok) {
      console.log("Data sent successfully!");
      setMessage("Response Submitted");
      setInitialFault("");
      setUnitNumber("");
      setDeliverDate("");
      setReceiveDate("");
      setError(null);
    } else {
      console.error("Failed to send data!");
      //setError(error.response.data.message);
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
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        value,
      ]);
      setMoreFaults(selectedOptions.toString());
    } else {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== value)
      );
      setMoreFaults(selectedOptions.toString());
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="unitNumber">Unit Number</label>
          <input
            type="text"
            className="form-control"
            name="unitNumber"
            id="unitNumber"
            aria-describedby="emailHelp"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="receiveDate">R&R Receving Date</label>
          <input
            type="date"
            className="form-control"
            id="receiveDate"
            name="receiveDate"
            placeholder="Password"
            value={receiveDate}
            onChange={(e) => setReceiveDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="initialFault">Initial Fault</label>
          <input
            type="text"
            className="form-control"
            id="initialFault"
            name="initialFault"
            aria-describedby="emailHelp"
            value={initialFault}
            onChange={(e) => setInitialFault(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="deliverDate">Deliverd Date</label>
          <input
            type="date"
            className="form-control"
            id="deliverDate"
            name="deliverDate"
            value={deliverDate}
            onChange={(e) => setDeliverDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="deliverDate">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*;capture=camera"
            onChange={handleFileUpload}
          />
          {imageUrl && (
            <img
              className="form-group"
              style={{ width: "10%", height: "5%" }}
              src={imageUrl}
              alt="Uploaded image"
            />
          )}
        </div>

        <div className="form-group">
          <label for="initialFault">More Faults / Issues</label>
          <br></br>
          <table className="table table-striped table-dark">
            <tbody>
              <div className="row">
                <div className="col">
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
                </div>
                <div className="col">
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
                </div>
              </div>
            </tbody>
          </table>
        </div>

        <div className="form-check"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      {selectedOptions}
    </>
  );
};

export default MultipeInput;
