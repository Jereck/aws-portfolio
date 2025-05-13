---
title: "Using Terraform to Deploy a Static Website on S3"
description: "Learn how to use Terraform to deploy and manage a simple static website using AWS S3."
pubDate: 2025-05-13
author: "Jake Reck"
tags: ["Terraform", "AWS", "S3", "Infrastructure as Code", "DevOps"]
heroImage: '/blog-placeholder-3.jpg'
---

Infrastructure as Code (IaC) is one of the pillars of modern DevOps, and **Terraform** is one of the most powerful tools to define and manage cloud infrastructure. In this post, we’ll walk through deploying a static website to AWS S3 using Terraform.

---

## 🧠 Why Use Terraform for S3?

Manually setting up an S3 bucket via the AWS Console works fine... once. But when you want reproducibility, automation, and consistency — Terraform is a better approach.

Benefits:
- No clicking around in the AWS UI
- Easy to version and track changes in Git
- Automates permissions, hosting, and settings in one go

---

## 📦 Goal: Host a Static Website on S3

We’ll use Terraform to:
- Create a public S3 bucket
- Enable static website hosting
- Set an index page and error page
- Apply a bucket policy for public read access

---

## 📝 Terraform Code

Create a `main.tf` file like this:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "static_site" {
  bucket = "my-static-site-2025"  # Change to a unique bucket name

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.static_site.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*",
        Action = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.static_site.arn}/*"
      }
    ]
  })
}
```

## 🚀 How to Deploy It
Make sure you’ve set up AWS CLI credentials or environment variables:
```bash
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

Then run:
```bash
terraform init
terraform plan
terraform apply
```
It'll ask you to confirm - type yes, and your infrastructure will be live!

## 🔎 Accessing Your Site
After applying, Terraform will output your bucket’s website endpoint:

```bash
http://my-static-site-2025.s3-website-us-east-1.amazonaws.com
```

Upload your ```index.html``` manually (or automate this in a later step), and you’re live!

## 💡 Bonus: Things You Can Add Next

- 🔐 Use a CloudFront distribution for HTTPS & caching
- 📁 Automate uploads with Terraform or CI/CD
- 🔄 Add versioning to your bucket
- 🔧 Use terraform output to extract URLs or values

## Wrap-Up
This is a simple but powerful example of using Terraform to manage cloud infrastructure. Once you're comfortable with this pattern, you can start defining entire application stacks — EC2, RDS, VPCs, and more — all with declarative code.

Stay tuned — I’ll cover those next!