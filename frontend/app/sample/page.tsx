'use client';

import { useMatchesQuery } from "@/graphql/generated/graphql";

const SamplePage = () => {
  // const [loginMutation, { data, loading, error }] = useLoginMutation({
  //   variables: {
  //     email: "user3@example.com",
  //     password: "example3",
  //   },
  // });
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // const handleLogin = async () => {
  //   try {
  //     const response = await loginMutation();
  //     console.log('Login successful:', response.data);
  //   } catch (err) {
  //     console.error('Login error:', err);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>Sample Page</h1>
  //     <button onClick={handleLogin}>Login</button>
  //     <p>{JSON.stringify(data)}</p>
  //   </div>
  // );

  const { data, loading, error } = useMatchesQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Sample Page</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default SamplePage;