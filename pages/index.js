import { getSession } from 'next-auth/react';
import { getEmployees } from '../backend/utils/api-utils';
import Index from '../components/employee/Index';

const Home = ({ employees }) => {
  return (
    <Index employees={employees} />
  )
}

export async function getStaticProps({ req }) {
  const employees = await getEmployees();
  return {
    props: {
      employees: employees
    },
    revalidate: 5,
  }
}

export default Home;