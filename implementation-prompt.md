# PayloadCMS Course Platform Implementation

## Context

You are implementing a course platform database structure into an existing PayloadCMS application with NestJS backend and PostgreSQL database. The schema is defined in the accompanying `schema.sql` file. This is meant as an addition to the existing application (right now it's a landing page but there's the concept of users for example).
The schema is meant to be used as a reference for the database structure, no need to follow it exactly nor execute it.
You are free to make changes to the schema if you think it's necessary.

## Requirements

### Collections to Create

1. **Users** (extend existing)
   - Fields: email, password (use Payload's built-in auth), name, role (select: student/admin)
   - Enable authentication
   - Admin users can access the admin panel; students cannot

2. **Courses**
   - Fields: title, slug (auto-generated), description (richText), thumbnailUrl (upload), passingScore (number, default 70), isPublished (checkbox), createdBy (relationship to users)
   - Only admins can create/edit

3. **Modules**
   - Fields: course (relationship), title, position (number)
   - Order by position within a course

4. **Lessons**
   - Fields: module (relationship), title, type (select: video/text/quiz), position (number), isFinalQuiz (checkbox)
   - Conditional fields based on type:
     - If video: youtubeUrl (text), durationSeconds (number)
     - If text: body (richText)
     - If quiz: questions (array or separate collection)

5. **QuizQuestions**
   - Fields: lesson (relationship, filtered to quiz-type lessons), questionText (textarea), type (select: multiple_choice/true_false), position (number)
   - Has many options

6. **QuizOptions**
   - Fields: question (relationship), optionText (text), isCorrect (checkbox), position (number)

7. **LessonProgress**
   - Fields: user (relationship), lesson (relationship), completed (checkbox), completedAt (date)
   - Unique constraint on user + lesson

8. **QuizAttempts**
   - Fields: user (relationship), lesson (relationship), scorePercent (number), passed (checkbox)
   - Has many answers

9. **QuizAttemptAnswers**
   - Fields: attempt (relationship), question (relationship), selectedOption (relationship)

10. **Certificates**
    - Fields: user (relationship), course (relationship), quizAttempt (relationship), externalCertificateId (text), externalCertificateUrl (text), issuedAt (date)
    - Unique constraint on user + course

### Access Control

- **Courses**:
  - Read: Anyone can read published courses; admins can read all
  - Create/Update/Delete: Admins only

- **Modules/Lessons/Questions/Options**:
  - Read: Authenticated users or admins
  - Create/Update/Delete: Admins only

- **LessonProgress/QuizAttempts/QuizAttemptAnswers**:
  - Read/Create/Update: Own records only
  - Admins can read all

- **Certificates**:
  - Read: Own certificates or admins
  - Create: System only (triggered when quiz passed)

### Hooks to Implement

1. **After quiz attempt create**:
   - Calculate score based on correct answers
   - Set `passed` field based on course's `passingScore`
   - If passed AND is final quiz AND no certificate exists: trigger certificate generation

2. **Certificate generation**:
   - When triggered, call external certificate service
   - Store returned `externalCertificateId` and `externalCertificateUrl`

### API Endpoints (NestJS)

1. **POST /api/courses/:courseId/lessons/:lessonId/complete**
   - Marks lesson as completed for authenticated user

2. **POST /api/courses/:courseId/lessons/:lessonId/quiz/submit**
   - Input: array of { questionId, selectedOptionId }
   - Creates quiz attempt and answers, calculates score, triggers certificate if applicable
   - Returns: score, passed, certificateUrl (if generated)

3. **GET /api/courses/:courseId/progress**
   - Returns user's progress for course: completed lessons, quiz attempts, certificate status

### Database Considerations

- Use Payload's built-in PostgreSQL adapter
- Enable `timestamps` on all collections
- Add appropriate indexes via Payload's `index` field property

### File Structure Suggestion

```
src/
 └── collections/
    ├── Users.ts
    ├── Courses.ts
    ├── Modules.ts
    ├── Lessons.ts
    ├── QuizQuestions.ts
    ├── QuizOptions.ts
    ├── LessonProgress.ts
    ├── QuizAttempts.ts
    ├── QuizAttemptAnswers.ts
    └── Certificates.ts

```

## Implementation Notes

- Use Payload's relationship fields with `filterOptions` to constrain selections (e.g., quiz questions can only belong to quiz-type lessons)
- For lesson content polymorphism, consider using Payload's `blocks` field or conditional `admin.condition` to show/hide fields based on lesson type
- Consider adding soft delete (`deletedAt` field) for courses and lessons
- Add validation that only one final quiz exists per course
- Everything needs to be translatable like the existing structure. All fields should have a `label` and `description` in both languages (en and es).
