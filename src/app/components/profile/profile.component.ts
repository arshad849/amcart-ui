import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userInfo: any
  loading: boolean = true;
  error: string | null = null;

  constructor(private authService: AuthService,) {}
  
  ngOnInit(): void {
    this.authService.getUserInfo().then(user=>{
      if(user){
        this.authService.getUserFromDb(user.sub).subscribe({
          next :userData=>{
          this.userInfo = JSON.parse(userData);
          this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to fetch user details';
            console.error(err);
            this.loading = false;
          }
        });
      }
    })
  }
}
