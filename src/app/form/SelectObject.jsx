// WindowList.js
import React, { useState, useEffect } from "react";
import form from "../../data/form.json";

function SelectObject({ objClass, language, setSelectedObject }) {
  const data = form;
  const [objDatas, setObjDatas] = useState([]);
  const [objIndex, setObjIndex] = useState("");

  useEffect(() => {
    setObjDatas(data.sort((a, b) => {
      return a.class.sortKey.localeCompare(b.class.sortKey);
    }))
  }, [data, objDatas]);
  
  useEffect(() => {
    if (objClass) {
      const index = objDatas.findIndex(item => item.class.value === objClass);
      setObjIndex(index !== -1 ? index : 0);
    } else {
      setObjIndex(0);
    }
  }, [objDatas, objClass]);

  useEffect(() => {
    setSelectedObject(objDatas[objIndex]); 
  }, [objDatas, objIndex, setSelectedObject]);
  
  const handleObjectChange = (e) => {
    setObjIndex(e.target.value); // Set the ObjIndex based on local storage
  };
  
  const indent = (sortKey) => {
    // Split the sortKey string using '->' as the delimiter
    const arrowCount = sortKey.split("->").length - 1;

    // Create a string with the desired number of val characters
    const val = String.fromCharCode(8194).repeat(arrowCount);

    return val;
  };
  
  return (
    <div className="col-8">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="obj-select" className="col-form-label">
            Form:
          </label>
        </div>
        <div className="col-7">
          <select
            className="form-select"
            id="obj-select"
            value={objIndex}
            onChange={handleObjectChange}
          >
            {objDatas.map((obj, index) => (
              <option
                key={index}
                value={index}
                title={
                  obj.class.comments[language] ?? obj.class.comments.default
                }
              >
                {indent(obj.class.sortKey)}
                {obj.class.labels[language] ?? obj.class.labels.default}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectObject;
