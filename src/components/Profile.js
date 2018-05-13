import React, { Component } from 'react';
import { Card, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Text, TextInput, Modal, View, ScrollView } from 'react-native';
import { CardSection, Button } from './common';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      categories: [],
      newCategory: '',
      showModal: false
    };

    this.fetchUserInfo();
    this.fetchUserCategories();
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onAccept() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/userinfo/categories`)
    .push({ category: this.state.newCategory });

    this.setState({
      categories: [...this.state.categories, this.state.newCategory],
      newCategory: '',
      showModal: false
    });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onInputChanged(newCategory) {
    this.setState({ newCategory });
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }

  fetchUserInfo() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo`)
      .on('value', snapshot => {
        const payload = this.snapshotToArray(snapshot);
        console.log(payload);
        this.setState({
          firstName: payload[0].firstName,
          lastName: payload[0].lastName,
          email: payload[0].email,
          key: payload[0].key,
        });
      });
  }

  fetchUserCategories() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/categories`)
      .on('value', snapshot => {
        const payload = this.snapshotToArray(snapshot);
        console.log(payload);
        this.setState({
          categories: payload
        });
      });
  }

  deleteUserCategory(key) {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/categories`)
    .child(key).remove();
  }

  showModal() {
    return (
      <Modal
        visible={this.state.showModal}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.containerStyle}>
          <CardSection style={styles.cardSectionStyle}>
          <TextInput
            style={styles.textStyle}
            onChangeText={this.onInputChanged}
            placeholder="Input new category"
          />
          </CardSection>

          <CardSection>
            <Button
              style={{ backgroundColor: '#57d1c9' }}
              onPress={this.onAccept}>Yes</Button>
            <Button
              style={{ backgroundColor: '#57d1c9' }}
              onPress={this.onDecline}>No</Button>
          </CardSection>
        </View>
      </Modal>
    );
  }

  categoryList() {
    return this.state.categories.map(category =>
      <CardSection>
      <Button
        key={category.key}
        style={{ backgroundColor: '#57d1c9' }}
      >
        <Text> {category.category} </Text>
      </Button>
      <Icon
        onPress={this.deleteUserCategory.bind(this, category.key)}
        name="trash"
        size={30}
        color="black"
        style={styles.trash}
      />
      </CardSection>
    );
  }

  renderCategories() {
      return (
        <Card>
          <CardSection>
            <Text>Categories: </Text>
          </CardSection>
          <ScrollView>
          {this.categoryList()}
          </ScrollView>
          <CardSection>
            <Button
            style={{ backgroundColor: '#6293af' }}
            onPress={() => this.setState({ showModal: !this.state.showModal })}
            title="Add New Categories"
            >
              <Text style={styles.buttonText}> Add New Category </Text>
            </Button>
            {this.showModal()}
          </CardSection>
        </Card>
      );
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <ScrollView>
      <Card>
        <Card flexDirection="row">
          <Avatar
            large
            title={firstName}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text> Name: {firstName} {lastName} </Text>
        </Card>

        {this.renderCategories()}
      </Card>
    </ScrollView>
    );
  }
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    height: 100
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  trash: {
    padding: 10
  }
};

export default Profile;
