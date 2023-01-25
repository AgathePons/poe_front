import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Answer } from 'src/app/core/models/answer';
import { Question } from 'src/app/core/models/question';
import { AnswerService } from 'src/app/core/service/answer.service';
import { QuestionService } from 'src/app/core/service/question.service';
import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuestionDto } from 'src/app/question/dto/question-dto';
import { AnswerDto } from 'src/app/answer/dto/answer-dto';

@Component({
  selector: 'app-survey-order-answers',
  templateUrl: './survey-order-answers.component.html',
  styleUrls: ['./survey-order-answers.component.scss']
})
export class SurveyOrderAnswersComponent implements OnInit {

  public question!: Question;
  public currentListOrdered!: Array<Answer>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (routeParams: Params) => {
        const questionId: number = routeParams['id'];
        console.log('question id:', questionId);

        this.questionService.findOne(questionId).subscribe(
          (question: Question) => {
            this.question = question;
            this.currentListOrdered = question.getAnswers();
          }
        );
      }
    );
  }

  drop(event: CdkDragDrop<Answer[]>) {
    moveItemInArray(this.currentListOrdered, event.previousIndex, event.currentIndex);
    this.currentListOrdered.forEach((answer: Answer, index) => {
      answer.setOrderInQuestion(index);
    });
  }

  dragEnd($event: CdkDragEnd) {

  }

  public onSubmit(): void {
    this.currentListOrdered.forEach((answer: Answer) => {
      const dto: AnswerDto = new AnswerDto(answer);
      if (this.currentListOrdered.indexOf(answer) !== (this.currentListOrdered.length - 1)) {
        this.answerService.updateAnswer(dto).subscribe();
      } else {
        this.answerService.updateAnswer(dto).subscribe(
          answer => this.goBack()
        );
      }
    });
  }

  public goBack(): void {
    this.location.back()
  }

}