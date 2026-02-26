/**
 * SCRIPT DE TEST DE SECURITE
 * Teste que les routes API sont bien protégées avec authentication et authorization
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
const TIMEOUT = 5000;

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function request(method, path, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT,
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

async function testSecurite() {
  log('\n=== TESTS DE SECURITE ===\n', 'blue');

  let passed = 0;
  let failed = 0;

  // TEST 1: Accès à /api/users SANS token
  try {
    log('TEST 1: GET /api/users SANS token (doit être refusé)', 'yellow');
    const res = await request('GET', '/api/users');
    if (res.status === 401) {
      log(
        `✓ PASS: Requête refusée avec status ${res.status}`,
        'green'
      );
      log(`  Message: ${res.body.message}\n`, 'green');
      passed++;
    } else {
      log(
        `✗ FAIL: Expected 401, got ${res.status}`,
        'red'
      );
      log(`  Body: ${JSON.stringify(res.body)}\n`, 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL: ${error.message}\n`, 'red');
    failed++;
  }

  // TEST 2: Accès à /api/users AVEC token invalide
  try {
    log('TEST 2: GET /api/users AVEC token invalide (doit être refusé)', 'yellow');
    const res = await request('GET', '/api/users', 'invalid_token');
    if (res.status === 401) {
      log(
        `✓ PASS: Requête refusée avec status ${res.status}`,
        'green'
      );
      log(`  Message: ${res.body.message}\n`, 'green');
      passed++;
    } else {
      log(
        `✗ FAIL: Expected 401, got ${res.status}`,
        'red'
      );
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL: ${error.message}\n`, 'red');
    failed++;
  }

  // TEST 3: Accès à /api/frigos SANS token
  try {
    log('TEST 3: GET /api/frigos SANS token (doit être refusé)', 'yellow');
    const res = await request('GET', '/api/frigos');
    if (res.status === 401) {
      log(
        `✓ PASS: Requête refusée avec status ${res.status}`,
        'green'
      );
      log(`  Message: ${res.body.message}\n`, 'green');
      passed++;
    } else {
      log(
        `✗ FAIL: Expected 401, got ${res.status}`,
        'red'
      );
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL: ${error.message}\n`, 'red');
    failed++;
  }

  // TEST 4: POST /api/users SANS token
  try {
    log('TEST 4: POST /api/users SANS token (doit être refusé)', 'yellow');
    const res = await request('POST', '/api/users');
    if (res.status === 401) {
      log(
        `✓ PASS: Requête refusée avec status ${res.status}`,
        'green'
      );
      log(`  Message: ${res.body.message}\n`, 'green');
      passed++;
    } else {
      log(
        `✗ FAIL: Expected 401, got ${res.status}`,
        'red'
      );
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL: ${error.message}\n`, 'red');
    failed++;
  }

  // TEST 5: POST /api/samples SANS token
  try {
    log('TEST 5: POST /api/samples SANS token (doit être refusé)', 'yellow');
    const res = await request('POST', '/api/samples');
    if (res.status === 401) {
      log(
        `✓ PASS: Requête refusée avec status ${res.status}`,
        'green'
      );
      log(`  Message: ${res.body.message}\n`, 'green');
      passed++;
    } else {
      log(
        `✗ FAIL: Expected 401, got ${res.status}`,
        'red'
      );
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL: ${error.message}\n`, 'red');
    failed++;
  }

  // Résumé
  log(`\n=== RÉSUMÉ ===`, 'blue');
  log(`Réussis: ${passed}`, 'green');
  log(`Échoués: ${failed}`, failed > 0 ? 'red' : 'green');

  if (failed === 0) {
    log('\n✓ Tous les tests de sécurité sont passés!', 'green');
    process.exit(0);
  } else {
    log(`\n✗ ${failed} test(s) échoué(s)`, 'red');
    process.exit(1);
  }
}

// Vérifier que le serveur est accessible
async function waitForServer() {
  log('Attente du serveur...', 'yellow');
  for (let i = 0; i < 10; i++) {
    try {
      await request('GET', '/api/users/');
      log('✓ Serveur accessible\n', 'green');
      return;
    } catch (error) {
      if (i < 9) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }
  log('✗ Serveur non accessible au bout de 5 secondes', 'red');
  process.exit(1);
}

async function main() {
  await waitForServer();
  await testSecurite();
}

main();
