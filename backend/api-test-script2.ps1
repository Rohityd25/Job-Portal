$baseUrl = "http://localhost:8080/api"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$jobSeekerEmail = "seeker_$timestamp@test.com"
$recruiterEmail = "recruiter_$timestamp@test.com"
$password = "password123"

# Open file for writing
$logFile = "$PSScriptRoot\api-summary.txt"
$stream = [System.IO.StreamWriter]::new($logFile)

function Log($msg) {
    Write-Host $msg
    $stream.WriteLine($msg)
}

function Invoke-ApiRequest {
    param($Uri, $Method = "GET", $Body = @{}, $Token = $null)
    $headers = @{ "Content-Type" = "application/json" }
    if ($Token) { $headers["Authorization"] = "Bearer $Token" }
    try {
        $params = @{ Uri = $Uri; Method = $Method; Headers = $headers; ErrorAction = "Stop" }
        if ($Method -eq "POST" -or $Method -eq "PUT") { $params["Body"] = ($Body | ConvertTo-Json -Depth 10) }
        $resp = Invoke-RestMethod @params
        return @{ StatusCode = 200; Content = $resp }
    }
    catch {
        $status = 500
        $content = $_.Exception.Message
        if ($_.Exception.Response) {
            # Fix for PS Core vs Windows PS compatibility if needed, but assuming Windows PS for now based on context
            if ($_.Exception.Response.StatusCode) {
                $status = [int]$_.Exception.Response.StatusCode
            }
            $stream = $_.Exception.Response.GetResponseStream()
            if ($stream) {
                $reader = [System.IO.StreamReader]::new($stream)
                $content = $reader.ReadToEnd()
                $reader.Close()
            }
        }
        return @{ StatusCode = $status; Content = $content }
    }
}

Log "1. Register Seeker"
$res = Invoke-ApiRequest "$baseUrl/auth/register" "POST" @{ name = "Seeker"; email = $jobSeekerEmail; password = $password; role = "JOB_SEEKER" }
if ($res.StatusCode -eq 200) { Log "PASS" } else { Log "FAIL $($res.StatusCode) $($res.Content)" }

Log "1b. Register Recruiter"
$res = Invoke-ApiRequest "$baseUrl/auth/register" "POST" @{ name = "Recruiter"; email = $recruiterEmail; password = $password; role = "RECRUITER" }
if ($res.StatusCode -eq 200) { Log "PASS" } else { Log "FAIL $($res.StatusCode) $($res.Content)" }

Log "2. Login Seeker"
$res = Invoke-ApiRequest "$baseUrl/auth/login" "POST" @{ email = $jobSeekerEmail; password = $password }
$seekerToken = $res.Content
if ($res.StatusCode -eq 200) { Log "PASS" } else { Log "FAIL $($res.StatusCode)" }

Log "2b. Login Recruiter"
$res = Invoke-ApiRequest "$baseUrl/auth/login" "POST" @{ email = $recruiterEmail; password = $password }
$recruiterToken = $res.Content
if ($res.StatusCode -eq 200) { Log "PASS" } else { Log "FAIL $($res.StatusCode)" }

Log "3. Create Job"
if ($recruiterToken) {
    $res = Invoke-ApiRequest "$baseUrl/recruiter/jobs" "POST" @{ title = "Dev"; description = "Cool"; company = "Co"; location = "Loc"; salary = "100"; experience = "1"; skills = "Java" } -Token $recruiterToken
    $jobId = $res.Content.id
    if ($res.StatusCode -eq 200 -and $jobId) { Log "PASS JobId:$jobId" } else { Log "FAIL $($res.StatusCode)" }
}

Log "4. Apply"
if ($seekerToken -and $jobId) {
    $res = Invoke-ApiRequest "$baseUrl/jobs/$jobId/apply" "POST" @{} -Token $seekerToken
    if ($res.StatusCode -eq 200) { Log "PASS" } else { Log "FAIL $($res.StatusCode) $($res.Content)" }
}

Log "5. View My Apps"
if ($seekerToken) {
    $res = Invoke-ApiRequest "$baseUrl/job-seeker/my-applications" "GET" @{} -Token $seekerToken
    if ($res.StatusCode -eq 200) { Log "PASS Count:$($res.Content.Count)" } else { Log "FAIL $($res.StatusCode)" }
}

Log "6. View Recruiter Apps"
if ($recruiterToken -and $jobId) {
    $res = Invoke-ApiRequest "$baseUrl/recruiter/jobs/$jobId/applications" "GET" @{} -Token $recruiterToken
    if ($res.StatusCode -eq 200) { Log "PASS Count:$($res.Content.Count)" } else { Log "FAIL $($res.StatusCode)" }
}

$stream.Close()
