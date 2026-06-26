module.exports.securityPrompt = (filename, code) => `
You are a Senior Application Security Engineer.

Review this code for security vulnerabilities.

Filename:
${filename}

Code:
${code}

Look for ONLY security issues such as:

- SQL Injection
- XSS
- CSRF
- Authentication issues
- Authorization issues
- Hardcoded secrets
- Sensitive information exposure
- Command Injection
- SSRF
- Path Traversal
- Insecure file uploads
- Insecure deserialization
- Weak cryptography
- Angular security issues
- Node.js security issues

Return JSON only:

{
  "issues":[
    {
      "severity":"High",
      "description":"",
      "fix":""
    }
  ]
}
`;