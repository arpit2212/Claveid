import React, { useState, useEffect } from 'react';

const PasswordStrengthAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [specificFeedback, setSpecificFeedback] = useState([]);
  const [timeToHack, setTimeToHack] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Common password lists
  const commonWords = ['password', 'hello', 'admin', 'welcome', 'qwerty', 'test', 'love', 'abc', 'monkey', 'dragon', 'sunshine', 'football', 'baseball', 'soccer', 'princess', 'shadow', 'access', 'master', 'money', 'ninja', 'mustang', 'superman', 'batman', 'trustno1', 'iloveyou'];
  const commonSequences = ['12345', '123456', '1234567', '12345678', 'qwerty', 'asdfgh', 'zxcvbn', 'abcdef', 'abcd', 'qwert'];

  // Calculate estimated crack time
  const calculateCrackTime = (password, score) => {
    // Base calculation on password characteristics and score
    if (score < 20) {
      // Very weak passwords
      if (password.length <= 6) return 'Instantly (less than 1 second)';
      if (/^\d+$/.test(password)) return 'Less than 1 minute';
      if (commonWords.some(word => password.toLowerCase().includes(word))) return 'Less than 5 minutes';
      return 'About 10 minutes';
    } 
    else if (score < 40) {
      // Weak passwords
      if (password.length <= 8) return 'About 3 hours';
      if (/^[a-zA-Z]+$/.test(password)) return 'About 2 days';
      return 'About 1 week';
    }
    else if (score < 60) {
      // Moderate passwords
      if (password.length <= 10) return 'About 3 months';
      if (!/[^A-Za-z0-9]/.test(password)) return 'About 1 year';
      return 'About 5 years';
    }
    else if (score < 80) {
      // Strong passwords
      if (password.length <= 12) return 'About 200 years';
      if (!/[^A-Za-z0-9]/.test(password)) return 'About 500 years';
      return 'About 3,000 years';
    }
    else {
      // Very strong passwords
      if (password.length <= 14) return 'About 10,000 years';
      if (password.length <= 16) return 'About 800,000 years';
      return 'Over 1 million years';
    }
  };

  // Analyze password strength
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback('');
      setSpecificFeedback([]);
      setTimeToHack('');
      setSuggestions([]);
      return;
    }

    // Calculate strength based on various factors
    let score = 0;
    const issues = [];
    
    // Length (up to 25 points)
    const lengthScore = Math.min(25, password.length * 2);
    score += lengthScore;
    
    // Character variety (up to 25 points)
    let varietyScore = 0;
    if (/[A-Z]/.test(password)) varietyScore += 5;
    if (/[a-z]/.test(password)) varietyScore += 5;
    if (/[0-9]/.test(password)) varietyScore += 5;
    if (/[^A-Za-z0-9]/.test(password)) varietyScore += 10;
    
    score += varietyScore;
    
    // Check for common patterns
    let patternPenalty = 0;
    
    // Check for common words
    const lowerPassword = password.toLowerCase();
    for (const word of commonWords) {
      if (lowerPassword.includes(word)) {
        const wordExplanation = `Your password contains the common word "${word}". Hackers use dictionaries with millions of common words and phrases when attempting to crack passwords. Dictionary-based attacks can quickly identify passwords containing words like "${word}". Even adding numbers or special characters around common words doesn't provide sufficient protection against modern password cracking tools.`;
        issues.push(wordExplanation);
        patternPenalty += 15;
        break;
      }
    }
    
    // Check for keyboard sequences
    for (const seq of commonSequences) {
      if (lowerPassword.includes(seq)) {
        issues.push(`Your password contains the common sequence "${seq}", which makes it predictable and easy to guess using basic cracking algorithms.`);
        patternPenalty += 15;
        break;
      }
    }
    
    // Check for repeated characters
    if (/(.)\1{2,}/.test(password)) {
      issues.push("Your password contains repeated characters, which significantly reduces its complexity and makes it more vulnerable to pattern-based attacks.");
      patternPenalty += 10;
    }
    
    // Check for sequential numeric patterns
    if (/(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2,}/.test(password)) {
      issues.push("Your password contains sequential numbers, making it predictable and easy to crack with standard password attack methods.");
      patternPenalty += 10;
    }
    
    // Check if password is solely numbers
    if (/^\d+$/.test(password)) {
      issues.push("Your password consists only of numbers. Numeric-only passwords are extremely vulnerable as they lack the complexity needed to resist basic brute force attacks. Modern password cracking software can test all possible numeric combinations very quickly.");
      patternPenalty += 15;
    }
    
    // Check if password is solely letters
    if (/^[a-zA-Z]+$/.test(password)) {
      const lettersOnlyExplanation = "Your password consists only of letters, which makes it significantly easier to crack. Without numbers or special characters, the password's complexity is drastically reduced. Password cracking tools can try all letter combinations much faster than combinations that include other character types. This reduces the potential combinations an attacker would need to try by millions or billions, depending on length.";
      issues.push(lettersOnlyExplanation);
      patternPenalty += 10;
    }
    
    // Subtract penalties from score (but ensure it doesn't go negative)
    score = Math.max(0, score - patternPenalty);
    
    // Give bonus for good entropy if password is long enough
    if (password.length > 12 && varietyScore >= 20) {
      const entropyBonus = Math.min(25, (password.length - 12) * 2);
      score += entropyBonus;
    }
    
    // Cap at 100
    score = Math.min(100, score);
    setStrength(score);
    
    // Set time to hack estimate
    const estimatedTime = calculateCrackTime(password, score);
    setTimeToHack(estimatedTime);
    
    // Set general feedback
    if (score < 20) {
      setFeedback('Very weak: This password is extremely vulnerable to attacks.');
    } else if (score < 40) {
      setFeedback('Weak: This password needs serious improvement.');
    } else if (score < 60) {
      setFeedback('Moderate: This password provides basic protection.');
    } else if (score < 80) {
      setFeedback('Strong: This is a good password.');
    } else {
      setFeedback('Very strong: Excellent password choice!');
    }
    
    // Add positive feedback for strong passwords
    if (score >= 80) {
      issues.push("Excellent! Your password uses a good mix of characters and length.");
    } else if (score >= 60 && issues.length === 0) {
      issues.push("Good job! Consider adding more variety or length for even better security.");
    }
    
    setSpecificFeedback(issues);
    
    // Generate password suggestions
    generateSuggestions();
  }, [password]);

  // Generate password suggestions
  const generateSuggestions = () => {
    const suggestions = [];
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    for (let i = 0; i < 5; i++) {
      let suggestion = '';
      const length = Math.floor(Math.random() * 6) + 14; // 14-19 characters
      
      // Ensure each suggestion has at least one of each character type
      suggestion += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
      suggestion += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
      suggestion += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
      suggestion += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      
      // Fill the rest randomly
      const allChars = lowerChars + upperChars + numberChars + specialChars;
      for (let j = 4; j < length; j++) {
        suggestion += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
      
      // Shuffle the suggestion to avoid predictable patterns
      suggestion = suggestion.split('').sort(() => 0.5 - Math.random()).join('');
      
      suggestions.push(suggestion);
    }
    
    setSuggestions(suggestions);
  };

  // Copy suggestion to clipboard
  const copySuggestion = (suggestion) => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 20) return '#FF4136'; // Red
    if (strength < 40) return '#FF851B'; // Orange
    if (strength < 60) return '#FFDC00'; // Yellow
    if (strength < 80) return '#2ECC40'; // Light Green
    return '#0074D9'; // Blue
  };

  return (
    <div
    id="Password-analyser"
    className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl border-4 border-gray-300 mt-16 mb-10 "
  >
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Password Strength Analyzer</h1>
      
      {/* Password input */}
      <div className="w-full relative mb-6">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Enter your password"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      
      {/* Strength meter */}
      {password && (
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Strength: {strength}/100</span>
            <span className="text-sm font-medium" style={{ color: getStrengthColor() }}>
              {strength < 20 ? 'Very Weak' : 
               strength < 40 ? 'Weak' : 
               strength < 60 ? 'Moderate' : 
               strength < 80 ? 'Strong' : 'Very Strong'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${strength}%`, backgroundColor: getStrengthColor() }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Crack time estimation - highlighted */}
      {password && (
        <div className="w-full mb-4 p-3 bg-gray-800 text-white rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">Time to crack:</span>
            <span className="font-bold text-lg">{timeToHack}</span>
          </div>
        </div>
      )}
      
      {/* Feedback and security assessment */}
      {password && (
        <div className="w-full mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-800 mb-3 font-semibold">{feedback}</p>
          
          {/* Specific feedback points */}
          <div className="mb-3">
            {specificFeedback.map((item, index) => (
              <div key={index} className="flex items-start mb-3">
                <span className="mr-2 text-gray-800 mt-1">•</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Password suggestions */}
      {password && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-3 text-gray-800"> 5 Stronger alternatives :</h2>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="font-mono text-gray-800 text-sm">in this it will stronger Password <span className='text-red-600'>implemented soon</span></span>
                <button
                  onClick={() => copySuggestion(suggestion)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Copy notification */}
      {copied && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          Password copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthAnalyzer;