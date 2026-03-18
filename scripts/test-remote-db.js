require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing remote MySQL connection...\n');
  
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000
    // SSL disabled - server doesn't support it
  };

  console.log('Connection Config:');
  console.log('Host:', config.host);
  console.log('Port:', config.port);
  console.log('User:', config.user);
  console.log('Database:', config.database);
  console.log('SSL:', config.ssl ? 'Enabled' : 'Disabled');
  console.log('\nAttempting connection...\n');

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connection successful!');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test successful:', rows);
    
    await connection.end();
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n📋 Troubleshooting steps:');
      console.log('1. Check if the remote MySQL server is running');
      console.log('2. Verify the host and port are correct');
      console.log('3. Whitelist your IP address in the hosting control panel');
      console.log('4. Check firewall settings on the remote server');
      console.log('5. Verify remote MySQL access is enabled');
      console.log('\n💡 Your current IP: Visit https://whatismyipaddress.com/');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n📋 Authentication failed:');
      console.log('1. Check username and password');
      console.log('2. Verify database name is correct');
      console.log('3. Check user permissions in MySQL');
    }
    
    process.exit(1);
  }
}

testConnection();
