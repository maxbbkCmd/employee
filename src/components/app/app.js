import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      data: [
        { name: 'Kirill', salary: 15, increase: false, rise: true, id: 1 },
        { name: 'Dima', salary: 950, increase: true, rise: false, id: 2 },
        { name: 'Sveta', salary: 1500, increase: false, rise: false, id: 3 },
      ],
      term: '',
      filter: 'all',
    }),
    (this.maxId = 4);
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((elem) => elem.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    if (!name || !salary) {
      alert('Имя и зарплата должны быть заполнены');
      return;
    }

    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToogleProps = (id, props) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [props]: !item[props] };
        }
        return item;
      }),
    }));
  };

  /* 1. Метод обновления поиска */
  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  /* 2. Метод фильтрация данных */
  searchEmp = (item, term) => {
    if (term === 0) {
      return item;
    }

    return item.filter((item) => item.name.indexOf(term) > -1);
  };

  filterPost = (item, filter) => {
    switch (filter) {
      case 'rise':
        return item.filter((item) => item.rise);
      case 'more1000':
        return item.filter((item) => item.salary > 1000);
      default:
        return item;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = data.length;
    const employeeCount = data.filter((item) => item.increase).length;
    /* 3. Подготовка видимых данных */
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo dataLength={employeeCount} employees={employees} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          {/* <AppFilter onUpdateRaise={this.onUpdateRaise} /> */}
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        {/* 4. Передача данных в дочерние компоненты */}
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToogleProps={this.onToogleProps}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
