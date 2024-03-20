import MUIDataTable from "mui-datatables";

function App() {
  const columns = ["name", "Company", "City", "State"];

  const data = [["Anandan", "HUBINO", "Erode", "TamilNadu"]];
  const options = {
    filterType: "checkbox",
  };
  return (
    <div className="App">
      <h1>Details</h1>
      <MUIDataTable
        title={"Stadium Details"}
        data={data}
        options={options}
        columns={columns}
      />
    </div>
  );
}

export default App;
