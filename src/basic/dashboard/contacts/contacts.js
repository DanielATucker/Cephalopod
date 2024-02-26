import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import SearchBar from "react-js-search";

export class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    addContact = async (contact) => {
        await axios
            .put(
                `http://${process.env.host}/contacts/addContact`,
                {
                    username: this.props.username,
                    contact: contact,
                },
                {
                    withCredentials: true,
                }
            )
            .then((result) => {
                console.log(
                    `await axios update: ${JSON.stringify(result.data, null, 2)}`
                );
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    returnedContacts = (term) => {
        console.log(`ReturnedContacts term: ${term}`);
        Object.values(this.props.allUsers).forEach((user) => {
            console.log(`USER: ${user}`);
            console.log(`USERS: ${JSON.stringify(this.props.allUsers)}`);
            if (Boolean(term) && `${user.username}`.startsWith(term)) {
                this.props.getReturnedUsers(user);
            } else {
                this.props.clearUsers();
            }
        });
    };

    getUsers = async () => {
        await axios
            .put(
                `http://${process.env.host}/contacts/get_users`,
                {
                    username: this.props.username,
                },
                {
                    withCredentials: true,
                }
            )
            .then((result) => {
                console.log(`USERS update: ${JSON.stringify(result.data, null, 2)}`);
                this.props.getAllUsers(result.data);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    getContacts = async () => {
        await axios
            .put(
                `http://${process.env.host}/contacts/get_contacts`,
                {
                    username: this.props.username,
                },
                {
                    withCredentials: true,
                }
            )
            .then((result) => {
                console.log(`Contacts update: ${JSON.stringify(result.data, null, 2)}`);
                this.props.getAllContacts(result.data);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };
    

    componentDidMount() {
        this.getContacts();
        this.getUsers();
    }

    render() {
        console.log(`UsersBack: ${JSON.stringify(this.props.usersBack, null, 2)}`);

        console.log(`Contacts: ${JSON.stringify(this.props.contacts, null, 2)}`);

        let contacts = Object.values(this.props.contacts).map((contact) => (
            <Card>
                <CardContent>
                    <h4> {contact.username}</h4>
                    <Button
                        onClick={this.props.setActiveChat(contact.username)}
                    > Message</Button>
                </CardContent>
            </Card>
        ));

        let returnedContacts = Object.values(this.props.usersBack).map(
            (contact) => (
                <Card>
                    <CardContent>
                        <h4> {contact.username}</h4>
                        <Button
                            onClick={() => {
                                this.addContact(contact.username);
                                setTimeout(this.getContacts, 1000);
                            }}
                        >
                            {" "}
                            Add Contact
                        </Button>
                    </CardContent>
                </Card>
            )
        );

        return (
            <>
                <div class="col">
                    <Card>
                        <CardContent>
                            <h1>Contacts</h1>
                            {contacts}
                        </CardContent>
                    </Card>
                </div>
                <div class="col">
                    <Card>
                        <CardContent>
                            <h1> Add New Contact</h1>
                            <SearchBar
                                placeHolderText={"Find a contact"}
                                onSearchTextChange={(term, hits) => {
                                    this.returnedContacts(term);
                                }}
                            />
                            {returnedContacts}
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }
}

export default Contacts;