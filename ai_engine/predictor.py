def predict_loan(age, income, loan_amount, credit_score):

    score = 0
    reasons = []
    suggestions = []

    # =====================================
    # Credit Score (40 Marks)
    # =====================================

    if credit_score >= 750:
        score += 40

    elif credit_score >= 700:
        score += 35

    elif credit_score >= 650:
        score += 20
        reasons.append("Credit score is below the preferred level.")
        suggestions.append("Increase your credit score above 700.")

    else:
        score += 5
        reasons.append("Very low credit score.")
        suggestions.append(
            "Pay credit card bills on time to improve your score."
        )

    # =====================================
    # Income (30 Marks)
    # =====================================

    if income >= 60000:
        score += 30

    elif income >= 40000:
        score += 25

    elif income >= 30000:
        score += 18

    else:
        score += 5
        reasons.append("Monthly income is low.")
        suggestions.append(
            "Increase monthly income or add a co-applicant."
        )

    # =====================================
    # Loan Amount (20 Marks)
    # =====================================

    if loan_amount <= income * 10:
        score += 20

    elif loan_amount <= income * 15:
        score += 12
        suggestions.append(
            "Consider applying for a slightly lower loan amount."
        )

    else:
        score += 3
        reasons.append(
            "Requested loan amount is very high."
        )
        suggestions.append(
            "Reduce the requested loan amount."
        )

    # =====================================
    # Age (10 Marks)
    # =====================================

    if 23 <= age <= 55:
        score += 10

    elif 18 <= age <= 60:
        score += 6

    else:
        score += 2
        reasons.append(
            "Age may affect loan approval."
        )
        suggestions.append(
            "A guarantor may improve approval chances."
        )

    # =====================================
    # Eligibility Percentage
    # =====================================

    eligibility = min(score, 100)

    # =====================================
    # AI Prediction
    # =====================================

    if eligibility >= 75:

        prediction = "Approved"

        feedback = (
            "🎉 Excellent profile! Your financial details indicate a high probability of loan approval."
        )

        ai_tip = (
            "Maintain your credit score above 750 and continue timely repayments to receive better interest rates."
        )

    elif eligibility >= 55:

        prediction = "Pending"

        feedback = (
            "Your application has moderate eligibility. Some improvements can significantly increase approval chances."
        )

        ai_tip = (
            "Increasing income or improving your credit score can make your application stronger."
        )

    else:

        prediction = "Rejected"

        feedback = (
            "Your application currently does not satisfy the recommended eligibility requirements."
        )

        ai_tip = (
            "Improve your credit score, increase monthly income, or reduce the requested loan amount before reapplying."
        )

    # =====================================
    # Build Detailed Feedback
    # =====================================

    message = feedback

    if reasons:

        message += "\n\nReasons:\n• "
        message += "\n• ".join(reasons)

    if suggestions:

        message += "\n\nSuggestions:\n• "
        message += "\n• ".join(suggestions)

    # =====================================
    # Return Result
    # =====================================

    return {

        "prediction": prediction,

        "message": message,

        "eligibility": eligibility,

        # Fixed key (matches views.py)
        "ai_tip": ai_tip,

        "suggestions": suggestions,

    }