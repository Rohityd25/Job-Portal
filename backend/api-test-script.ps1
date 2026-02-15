# API Testing Script for Job Portal
# Using Write-Output for better capture
$baseUrl = "http://localhost:8080/api"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$jobSeekerEmail = "seeker_$timestamp@test.com"
$recruiterEmail = "recruiter_$timestamp@test.com"
$password = "password123"

function Print-Result {
    param($testName, $response, $status)
    if ($response.StatusCode -eq $status) {
        Write-Output "PASS: $testName"
    }
    else {
        Write-Output "FAIL: $testName (Expected $status, Got $($response.StatusCode))"
        if ($response.Content) {
            Write-Output "Details: $($response.Content)"
        }
    }
}

function Invoke-ApiRequest {
    param(
        [string]$Uri,
        [string]$Method = "GET",
        [hashtable]$Body = @{},
        [string]$Token = $null
    )
    
    $headers = @{ "Content-Type" = "application/json" }
    if ($Token) { $headers["Authorization"] = "Bearer $Token" }

    try {
        $params = @{
            Uri         = $Uri
            Method      = $Method
            Headers     = $headers
            ErrorAction = "Stop"
        }
        if ($Method -eq "POST" -or $Method -eq "PUT") {
            $params["Body"] = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params
        return [PSCustomObject]@{ StatusCode = 200; Content = $response }
    }
    catch {
        $status = 500
        $content = $_.Exception.Message
        if ($_.Exception.Response) {
            $status = $_.Exception.Response.StatusCode.value__
            # try to read error stream
            if ($_.Exception.Response.GetResponseStream()) {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $content = $reader.ReadToEnd()
            }
        }
        return [PSCustomObject]@{ StatusCode = $status; Content = $content }
    }
}

Write-Output "--- 1. Testing Registration ---"
$seekerReg = Invoke-ApiRequest -Uri "$baseUrl/auth/register" -Method "POST" -Body @{
    name     = "Test Seeker"
    email    = $jobSeekerEmail
    password = $password
    role     = "JOB_SEEKER"
}
Print-Result "Register Job Seeker" $seekerReg 200

$recruiterReg = Invoke-ApiRequest -Uri "$baseUrl/auth/register" -Method "POST" -Body @{
    name     = "Test Recruiter"
    email    = $recruiterEmail
    password = $password
    role     = "RECRUITER"
}
Print-Result "Register Recruiter" $recruiterReg 200

Write-Output "--- 2. Testing Login ---"
$seekerLogin = Invoke-ApiRequest -Uri "$baseUrl/auth/login" -Method "POST" -Body @{
    email    = $jobSeekerEmail
    password = $password
}
Print-Result "Login Job Seeker" $seekerLogin 200
$seekerToken = $seekerLogin.Content

$recruiterLogin = Invoke-ApiRequest -Uri "$baseUrl/auth/login" -Method "POST" -Body @{
    email    = $recruiterEmail
    password = $password
}
Print-Result "Login Recruiter" $recruiterLogin 200
$recruiterToken = $recruiterLogin.Content

Write-Output "--- 3. Testing Job Creation ---"
if ($recruiterToken) {
    $jobBody = @{
        title       = "Dev $timestamp"
        description = "Desc"
        company     = "Comp"
        location    = "Loc"
        salary      = "100"
        experience  = "1yr"
        skills      = "Java"
    }
    $createJob = Invoke-ApiRequest -Uri "$baseUrl/recruiter/jobs" -Method "POST" -Body $jobBody -Token $recruiterToken
    Print-Result "Recruiter Create Job" $createJob 200
    
    $jobId = $createJob.Content.id
    if ($jobId) { Write-Output "Job ID: $jobId" }

    $myJobs = Invoke-ApiRequest -Uri "$baseUrl/recruiter/jobs" -Method "GET" -Token $recruiterToken
    Print-Result "Get Recruiter Jobs" $myJobs 200
}

Write-Output "--- 4. Testing Public API ---"
$allJobs = Invoke-ApiRequest -Uri "$baseUrl/jobs" -Method "GET"
Print-Result "Get All Jobs" $allJobs 200

Write-Output "--- 5. Testing Applications ---"
if ($seekerToken -and $jobId) {
    $apply = Invoke-ApiRequest -Uri "$baseUrl/jobs/$jobId/apply" -Method "POST" -Token $seekerToken
    Print-Result "Apply for Job" $apply 200
    
    $myApps = Invoke-ApiRequest -Uri "$baseUrl/job-seeker/my-applications" -Method "GET" -Token $seekerToken
    Print-Result "Get My Apps" $myApps 200
}

Write-Output "--- 6. Testing Recruiter View Apps ---"
if ($recruiterToken -and $jobId) {
    $viewApps = Invoke-ApiRequest -Uri "$baseUrl/recruiter/jobs/$jobId/applications" -Method "GET" -Token $recruiterToken
    Print-Result "View Apps" $viewApps 200
}
