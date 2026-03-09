
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GoogleSheetsSetup: React.FC = () => {
  const { toast } = useToast();

  const googleAppsScriptCode = `function doPost(e) {
  try {
    // Get the active spreadsheet (make sure to replace with your sheet ID)
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Create headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Source']
      ]);
    }
    
    // Add the new row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.subject,
      data.message,
      data.source
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Code has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the code manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to Connect Your Contact Form to Google Sheets
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 1: Create a Google Sheet</h3>
            <p className="text-gray-600">
              Create a new Google Sheet where you want to store the contact form submissions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 2: Open Google Apps Script</h3>
            <p className="text-gray-600">
              From your Google Sheet, go to <strong>Extensions</strong> → <strong>Apps Script</strong>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 3: Add the Script Code</h3>
            <p className="text-gray-600">
              Replace the default code with the following script:
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{googleAppsScriptCode}</code>
              </pre>
              <Button
                onClick={() => copyToClipboard(googleAppsScriptCode)}
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 4: Deploy as Web App</h3>
            <div className="space-y-2 text-gray-600">
              <p>1. Click <strong>Deploy</strong> → <strong>New deployment</strong></p>
              <p>2. Click the gear icon and select <strong>Web app</strong></p>
              <p>3. Set <strong>Execute as:</strong> "Me"</p>
              <p>4. Set <strong>Who has access:</strong> "Anyone"</p>
              <p>5. Click <strong>Deploy</strong></p>
              <p>6. Copy the web app URL</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 5: Configure the Contact Form</h3>
            <p className="text-gray-600">
              Paste the web app URL into the Google Sheets configuration section in your contact form 
              (click the settings icon next to "Send Me a Message").
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• The web app URL should look like: <code>https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec</code></li>
              <li>• Make sure your Google Sheet is accessible to the script</li>
              <li>• The script will automatically create headers if they don't exist</li>
              <li>• Test the form after setup to ensure submissions are working</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button asChild variant="outline">
              <a
                href="https://script.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Google Apps Script
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Google Sheets
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsSetup;
