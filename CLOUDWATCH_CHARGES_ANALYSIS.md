# CloudWatch MetricMonitorUsage Charges Analysis

## Summary
You are being charged **$0.29** for CloudWatch MetricMonitorUsage in December 2025, with the largest charge ($0.26) occurring on **December 12, 2025**.

## What is MetricMonitorUsage?
This charge occurs when you publish **custom metrics** to CloudWatch using the `PutMetricData` API. 
- **First 10,000 custom metrics per month**: FREE
- **After 10,000**: $0.30 per metric per month
- Your charge of $0.29 suggests approximately **1 custom metric** is being charged (after free tier)

## Investigation Results

### ✅ What I Checked:
1. **CloudWatch Alarms**: None found (alarms are free for first 10, then $0.10/alarm/month)
2. **Metric Streams**: None found
3. **Dashboards**: None found
4. **Custom Metrics**: No custom namespaces found in current metrics list
5. **AWS Service Metrics**: Only standard AWS service metrics (AppRunner, Lambda, CloudFront, Glue, etc.) - these are FREE

### 🔍 Active Services That Could Be Publishing Metrics:
1. **AppRunner Services** (2 services):
   - `customer-support-agent` (RUNNING)
   - `chatbot` (PAUSED)
   
2. **Lambda Functions** (2 functions):
   - `ecom-event-generator` (Python 3.12) - **3,076 invocations** between Dec 11-13
   - `GreenBIke` (Python 3.9)

3. **AWS Glue Jobs**: Many metrics in "Glue" namespace (but these are AWS service metrics, not custom)

## Most Likely Cause

The **$0.26 charge on December 12** suggests something started or increased activity that day. The most likely culprits are:

1. **Lambda Function `ecom-event-generator`**: 
   - High activity (3,076 invocations Dec 11-13)
   - Last modified Dec 8, 2025
   - If this function publishes custom metrics, it could be the source

2. **AppRunner Service `customer-support-agent`**:
   - Currently RUNNING
   - If the application code publishes custom metrics, this could be the source

## How to Find the Source

### Option 1: Check CloudWatch Metrics (Recent Activity)
```bash
# Check for metrics published in the last 24 hours
aws cloudwatch list-metrics --query 'Metrics[*].[Namespace,MetricName]' --output table | grep -v "AWS/"
```

### Option 2: Check Application Code
Review the code in:
- Lambda functions (`ecom-event-generator`, `GreenBIke`)
- AppRunner services (`customer-support-agent`)
- Look for: `boto3.client('cloudwatch')`, `put_metric_data`, `PutMetricData`

### Option 3: Check CloudWatch Logs
```bash
# Check Lambda logs for metric publishing
aws logs filter-log-events \
  --log-group-name /aws/lambda/ecom-event-generator \
  --start-time $(date -d '2 days ago' +%s)000 \
  --filter-pattern "metric"
```

### Option 4: Use AWS Cost Explorer
1. Go to AWS Console → Cost Explorer
2. Filter by: Service = "Amazon CloudWatch"
3. Group by: Usage Type
4. Look for "CW:MetricMonitorUsage" line items
5. Click on the charge to see resource-level details

## How to Stop the Charges

### Immediate Actions:
1. **Identify the source** using the methods above
2. **Stop publishing custom metrics** if not needed
3. **Delete custom metrics** if they're no longer required:
   ```bash
   # Note: You cannot directly delete metrics, but stopping the code that publishes them will stop charges
   ```

### Long-term Solutions:
1. **Review your code** for unnecessary metric publishing
2. **Use AWS service metrics** instead of custom metrics when possible (they're free)
3. **Set up billing alerts** to catch charges early:
   ```bash
   aws cloudwatch put-metric-alarm \
     --alarm-name cloudwatch-cost-alert \
     --alarm-description "Alert when CloudWatch costs exceed $1" \
     --metric-name EstimatedCharges \
     --namespace AWS/Billing \
     --statistic Maximum \
     --period 86400 \
     --threshold 1.0 \
     --comparison-operator GreaterThanThreshold
   ```

## Recommendations

1. **Investigate Lambda `ecom-event-generator`** first (highest activity)
2. **Check AppRunner `customer-support-agent`** application code
3. **Monitor costs daily** for the next few days to see if charges continue
4. **Set up billing alerts** to prevent surprise charges
5. **Review AWS Cost Explorer** daily breakdown to identify patterns

## Cost Breakdown (From Your Data)
- Dec-01: $0.00
- Dec-04: $0.00  
- Dec-06: $0.00
- Dec-08: $0.00
- Dec-09: $0.00
- Dec-10: $0.00
- Dec-11: $0.04 ⚠️ (First significant charge)
- Dec-12: $0.26 ⚠️⚠️ (Largest charge - something started here!)
- **Total: $0.29**

The pattern suggests something began publishing custom metrics around December 11-12.
