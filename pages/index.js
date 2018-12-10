import React, { Component } from 'react';
import { Card, Button, Item, Image, Icon, Label } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    console.log("getInitialProps ...");
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
}

renderCampaigns() {
  const items = this.props.campaigns.map(address => {
    return {
      header: address,
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true
    };
  });

  return <Card.Group items={items} />;
}
renderCampaignsItems() {



  const paragraph = <Image src='/static/short-paragraph.png' />

return (
  <Item.Group divided>
    <Item>
      <Item.Image src='/static/grommet.jpeg' />

      <Item.Content>
        <Item.Header as='a'>Sumatra</Item.Header>
        <Item.Meta>
          <span className='cinema'>Union Square 14</span>
        </Item.Meta>
        <Item.Description>Epic, yet friendly Left straight out from accomadation with plenty of other breaks nearby</Item.Description>
        <Item.Extra>
        <Button primary floated='right'>
          View Campaign
          <Icon name='right chevron' />
        </Button>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            View Campaign
            <Icon name='right chevron' />
          </Button>
          <Label>Limited</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>{paragraph}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>);
}

  render() {
    return (
      <Layout>
      <div>
    <h3>Open Campaigns</h3>
    <Link route="/campaigns/new">
      <a>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
      </a>
    </Link>
    {this.renderCampaignsItems()}

    </div>
    </Layout>

  );
  }
}

export default CampaignIndex;
