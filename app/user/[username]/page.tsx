export default function User({ params }: { params: { username: string } }) {
  const { username } = params; // Access the dynamic part of the route (e.g., blog/:id)

  return (
    <main>
      <h1>user name: {username}</h1>
      <p>This is the content of user details {username}.</p>
    </main>
  );
}