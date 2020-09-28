import React from 'react';
import Button from './Button';
import Contact from './Contact';

class ListContacts extends React.Component {
  state = {
    visibleContacts: this.props.contacts.slice(0, 5),
    hiddeContacts: this.props.contacts.slice(5, this.props.contacts.length),
  };

  randElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  handleAddRandom = () => {
    if (this.state.hiddeContacts.length > 0) {
      const newContact = this.randElement(this.state.hiddeContacts);
      this.setState((oldState) => {
        return {
          visibleContacts: [newContact, ...oldState.visibleContacts],
          hiddeContacts: oldState.hiddeContacts.filter(
            (hideContact) => hideContact !== newContact
          ),
        };
      });
    } else {
      alert('There are no more contacts to add');
    }
  };
  handleSortBy = (orderType) => {
    this.setState((oldState) => {
      return {
        visibleContacts: oldState.visibleContacts.sort((a, b) =>
          a[orderType] > b[orderType] ? 1 : -1
        ),
      };
    });
  };
  deleteContact = (toDelete) => {
    this.setState((oldState) => {
      return {
        visibleContacts: oldState.visibleContacts.filter(
          (contact) => contact !== toDelete
        ),
      };
    });
  };
  render() {
    return (
      <div>
        <Button
          className="btn btn-primary mb-2 mr-2"
          onClick={this.handleAddRandom}
        >
          Add Random Contact
        </Button>
        <Button
          className="btn btn-secondary mb-2 mr-2"
          onClick={() => this.handleSortBy('name')}
        >
          Sort by name
        </Button>
        <Button
          className="btn btn-secondary mb-2"
          onClick={() => this.handleSortBy('popularity')}
        >
          Sort by popularity
        </Button>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.visibleContacts.map((contact, index) => (
              <Contact
                key={contact.id + index}
                contact={contact}
                deleteContact={this.deleteContact}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListContacts;
