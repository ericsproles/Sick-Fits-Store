import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';
import Account from '../components/Account';

const AccountPage = props => (
  <div>
    <PleaseSignIn>
      <Account />
    </PleaseSignIn>
  </div>
);

export default AccountPage;
