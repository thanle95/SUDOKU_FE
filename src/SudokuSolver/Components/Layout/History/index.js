import React, { useEffect, useState } from "react";

import axios from "axios";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import moment from "moment";
import { SERVER } from "../../../APIs/service";
import calDuration from "../../../Commons/Duration";
import { useSudokuContext } from "../../../Context/SudokuContext";

const pageSizes = [10, 25, 50, 100];

export const History = ({}) => {
  const {showHistory} = useSudokuContext()
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    const data = Object.values((await axios.get(`${SERVER}/api/Log`)).data);
    setDataSource(
      data.map((m) => ({
        initMatrix: m.initMatrix,
        solvedMatrix: m.solvedMatrix,
        startDate: moment(m.startDate)
          .utc(false)
          .format("YYYY-MM-DD, h:mm:ss.SSS a"),
        solvedDate: moment(m.solvedDate)
          .utc(false)
          .format("YYYY-MM-DD, h:mm:ss.SSS a"),
        duration: calDuration(moment(m.startDate), moment(m.solvedDate)),
      }))
    );
  };
  useEffect(() => {
    fetchData();
  }, [showHistory]);

 
  return (
    <div style={{width: "95%", margin: "auto"}}>
 
      {showHistory && (
        <DataGrid
          dataSource={dataSource}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
        >
          {/* <Column dataField="id" dataType="" /> */}
          <Column dataField="initMatrix" dataType="string" />
          <Column dataField="solvedMatrix" dataType="string" />
          <Column dataField="startDate" dataType="string" width={250} />
          <Column dataField="solvedDate" dataType="string" width={250} />
          <Column dataField="duration" dataType="string" width={150} />

          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
      )}
    </div>
  );
};
History.propTypes = {};
