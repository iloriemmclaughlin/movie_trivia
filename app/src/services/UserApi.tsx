import { user, game, createUserParams, updateUserParams } from './DTOs';

export async function getAllUsers(): Promise<user[]> {
  return await fetch(`http://localhost:8000/api/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then((data: user[]) => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export async function getUserByAuth(auth0: string): Promise<user> {
  return await fetch(`http://localhost:8000/api/users/${auth0}/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then((data: user) => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export async function getUserGames(userId: number): Promise<game[]> {
  return await fetch(`http://localhost:8000/api/users/${userId}/games`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then((data: game[]) => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export async function createUpdateUser(
  auth0: string,
  params: createUserParams,
): Promise<user> {
  return await fetch(`http://localhost:8000/api/users/${auth0}/createUpdate`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(params),
  })
    .then(response => response.json())
    .then((data: user) => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export async function deleteUser(userId: number): Promise<user> {
  return await fetch(`http://localhost:8000/api/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
    .then(response => response.json())
    .then((data: user) => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
