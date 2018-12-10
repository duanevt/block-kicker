import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import axios from 'axios';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };
  imageUrl = "https://s3-ap-southeast-2.amazonaws.com/blockchain-images/short-paragraph.png"

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log("image file name is = " + this.state.file)
  }

  onSubmit = async event => {
    event.preventDefault();
    

    this.setState({ loading: true, errorMessage: '' });

        // lets get the image file and upload it to aws s3
        console.log("start submit form processing");
        const formData = new FormData();

        formData.append('upl', this.state.file[0]);

        await axios.post(`/test-upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          // handle your response;
          console.log("all good")
          console.log(response.data)
          this.imageUrl = response.data.imageUrl;
        }).catch(error => {
          // handle your error
          console.log("oh no!")
          console.log(error)
        });

        console.log("Uploaded image = " + this.imageUrl);


    // try {
    //   const accounts = await web3.eth.getAccounts();
    //   await factory.methods
    //     .createCampaign(this.state.minimumContribution)
    //     .send({
    //       from: accounts[0]
    //     });

    //   Router.pushRoute('/');
    // } catch (err) {
    //   this.setState({ errorMessage: err.message });
    // }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <input label='upload file' type='file' onChange={this.handleFileUpload} />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
